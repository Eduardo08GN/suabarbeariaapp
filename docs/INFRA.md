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

## 3. pgbouncer (pool de conexões no Postgres)

**O que ganha:** um pool na frente do Postgres, segurando picos de conexão
quando o app escala (mais réplicas / mais carga). No volume atual, com uma
instância, o ganho é pequeno — por isso fazemos o corte **com cuidado**, não às
cegas (trocar `DATABASE_URL` foi o que causou o 500 de hoje).

**Cutover (a fazer juntos quando o pooler existir):**
1. No Coolify, subir um **pgbouncer** apontando pro Postgres
   `159.195.12.135:5434`, modo **transaction**.
2. Adicionar ao `prisma/schema.prisma` (eu aplico na hora do corte):
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL") // -> pgbouncer (porta 6432) com ?pgbouncer=true
     directUrl = env("DIRECT_URL")   // -> Postgres direto (5434), usado só em migrate/db push
   }
   ```
3. Setar as duas envs (app + `.env` local):
   - `DATABASE_URL=postgresql://...@PGBOUNCER:6432/suabarbeariaapp?pgbouncer=true`
   - `DIRECT_URL=postgresql://...@159.195.12.135:5434/suabarbeariaapp`
4. `npm run db:push` (usa a `DIRECT_URL`) e deploy.
5. Verificar `/painel`, `/pro` e o funil — só então considerar o corte fechado.

> Importante: com pgbouncer em modo transaction, o `?pgbouncer=true` é
> obrigatório (desliga prepared statements) e a `DIRECT_URL` é o que mantém o
> `db push`/migrations funcionando. Por isso não troco `DATABASE_URL` sozinho.
