# Infra — Redis, BullMQ e pgbouncer

Os três entram de forma **graceful**: o código já está no ar e, enquanto os
serviços não existem, a plataforma roda no caminho atual (notificação inline,
Postgres direto). Cada um "liga" quando você provisiona o serviço no Coolify e
seta a variável de ambiente. Nada quebra antes disso.

---

## 1. Redis + 2. BullMQ (fila de notificações)

**O que ganha:** o aviso de novo agendamento (e-mail + push) deixa de ser
"dispara e torce" no meio do request e passa por uma **fila com retry/backoff**
(4 tentativas, backoff exponencial). Se o Brevo/Meta oscilar, o job é
re-tentado em vez de perder a notificação.

**Código (já no repo):**
- `src/lib/redis.ts` — conexão ioredis a partir de `REDIS_URL` (null se ausente).
- `src/lib/queue.ts` — fila `notifications`; `enqueueBookingNotification()` cai no
  envio inline se não houver Redis.
- `src/lib/worker.ts` + `src/instrumentation.ts` — o worker sobe no boot do
  servidor (runtime nodejs) só quando há `REDIS_URL`.
- Pontos de disparo: `src/lib/payments.ts` (PIX confirmado) e
  `src/app/api/barber/checkout/route.ts` (agendamento sem cobrança).

**Para ligar:**
1. No Coolify, no mesmo projeto, **+ New → Database → Redis** (1 clique).
2. Pegue a connection string interna (algo como
   `redis://default:senha@<nome-do-servico>:6379`).
3. Setar a env e reiniciar:
   ```
   node scripts/coolify.js env set REDIS_URL redis://default:SENHA@HOST:6379
   ```
   (rode com `COOLIFY_APP_UUID` do app da barbearia)
4. Redeploy/restart. No log do app deve aparecer:
   `[worker] fila de notificacoes ativa`.

Sem o passo acima, tudo continua funcionando — só sem fila.

---

## 3. pgbouncer (pool de conexões no Postgres) — NO AR

**Status:** instalado e funcionando (verificado: `/painel` e funil renderizam
consultando o banco através do pooler). Transaction mode, na frente do Postgres.

> ### Regra de ouro (custou um outage)
> app→DB e pgbouncer→DB **sempre** pelo **host INTERNO** do Coolify
> (`<uuid>:5432`), **nunca** pelo IP público `159.195.12.135:5434`. De dentro do
> Docker, o IP público depende de *hairpin NAT* — frágil, derrubou o site.
> O `:5434` público é só pra acesso de fora (ex.: `db push` da tua máquina).

**A receita que funcionou (e os becos sem saída):**
- pgbouncer tem que ser um **Coolify Service (compose)**, NÃO uma "dockerimage
  application" — só o Service tem o **"Connect To Predefined Network"**
  (`connect_to_docker_network`) que coloca o container na rede `coolify`, onde o
  app o enxerga. Dockerimage app nasce em rede isolada e o app não alcança.
- Imagem **`edoburu/pgbouncer`** (sobe lazy, não morre se o DB não responder no
  boot). `bitnami/pgbouncer` ficava `exited` no boot.
- Hostname que o app usa = o **`container_name` do service**
  (`pgbouncer-<service-uuid>`), na porta do `LISTEN_PORT` (6432). NÃO é só
  `pgbouncer`.
- Depois do 1º deploy o service pode ficar `exited` — **um restart** sobe pra
  `running`.

**Config (compose do service):** `scripts/coolify-pgb-service.cjs` (na raiz do
MazyOS) provisiona tudo. Envs do edoburu: `DB_HOST=<postgres-interno>`,
`DB_PORT=5432`, `POOL_MODE=transaction`, `AUTH_TYPE=scram-sha-256`,
`IGNORE_STARTUP_PARAMETERS=extra_float_digits`, `LISTEN_PORT=6432`.

**Envs do app:**
- `DATABASE_URL=postgresql://barbearia:***@pgbouncer-<service-uuid>:6432/suabarbeariaapp?pgbouncer=true`
- `DIRECT_URL=postgresql://barbearia:***@<postgres-interno>:5432/suabarbeariaapp`
- `prisma/schema.prisma` tem `directUrl = env("DIRECT_URL")`.

> `?pgbouncer=true` desliga prepared statements (obrigatório em transaction
> mode). O checkout usa `$transaction` + `pg_advisory_xact_lock` — **compatível**
> com transaction mode porque o lock é *transaction-scoped* (não *session*).
> `DIRECT_URL` mantém `db push`/migrations no Postgres direto.
> **Rollback** (se algo quebrar): `DATABASE_URL` → host interno direto + deploy.
