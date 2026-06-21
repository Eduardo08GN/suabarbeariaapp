# Acessos da plataforma — SuaBarbeariaApp

Referência rápida de login por superfície. As senhas abaixo são as do **seed**
(demo / onboarding). Em produção real, cada dono define a própria senha.

- **Produção:** https://barbearia.appkash.com.br
- **Login (master, dono e barbeiro):** https://barbearia.appkash.com.br/login
  — todos entram pelo mesmo formulário; o sistema lê o papel (role) no token e
  manda cada um pra sua área automaticamente.

---

## Superfícies

### 1. Master — a agência
Painel da AutomaWeb pra gerir o negócio (pipeline, clientes, calendário, sites).

- **Entrar em:** https://barbearia.appkash.com.br/login
- **Cai em:** https://barbearia.appkash.com.br/master
- **Login:** `eduardo@suabarbeariaapp.com` / `master123`
- **Papel:** `MASTER`

### 2. Dono da barbearia — tenant
Cada barbearia tem o seu. Dashboard, agenda, serviços, produtos, equipe,
clientes e pagamentos.

- **Entrar em:** https://barbearia.appkash.com.br/login
- **Cai em:** https://barbearia.appkash.com.br/painel
- **Logins:**
  - Barbearia Torres → `torres@barbearia.com` / `tenant123`  _(verificado em produção)_
  - Barbearia Elite → `elite@barbearia.com` / `tenant123`
- **Papel:** `TENANT`

### 3. Profissional — barbeiro
App do barbeiro (PWA): a própria agenda do dia + notificação de cada novo
agendamento.

- **Entrar em:** https://barbearia.appkash.com.br/login
- **Cai em:** https://barbearia.appkash.com.br/pro
- **Login:** não há senha fixa de seed. O **dono cria** o acesso na tela
  **Equipe → botão "Acesso"** (define e-mail + senha do barbeiro). Pra revogar,
  o mesmo botão → "Remover" (o barbeiro perde o acesso na hora).
- **Papel:** `BARBER` — um usuário vinculado 1:1 a um barbeiro da equipe.

### 4. Cliente — funil público (sem login)
Onde o cliente final agenda. **Aberto, não tem login.**

- **URL:** https://barbearia.appkash.com.br/b/[slug-da-barbearia]
- **Exemplo:** https://barbearia.appkash.com.br/b/torres
- Fluxo: serviço → barbeiro → horário → confirmar (+ PIX, quando a barbearia
  conectou a conta de pagamento).

---

## Roteamento por papel
No login (`/login`), o papel fica no token e o middleware manda cada um pra "casa":

| Papel    | Entra em  | Cai em     |
|----------|-----------|------------|
| `MASTER` | `/login`  | `/master`  |
| `TENANT` | `/login`  | `/painel`  |
| `BARBER` | `/login`  | `/pro`     |

Quem tenta entrar numa área que não é a dele é redirecionado de volta pra sua.

---

## Segurança
As senhas `master123` / `tenant123` são de **seed** (demo). Para produção real,
trocar — especialmente a do master — e nunca reaproveitar essas senhas em contas
de clientes reais.
