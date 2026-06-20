# Roadmap: Order Bumps, Cupons e Upsell

Pendencias de produto para aumentar o ticket medio no checkout do agendamento.
Documento de planejamento (nao implementado ainda). Fundamentado na arquitetura
atual da plataforma e nos padroes ja validados do appmestre (repo
`github.com/Eduardo08GN/appmestre`, lido em `C:\Users\edlut\appmestre-ref`).

> Principio: a inspiracao de UX vem do concorrente e do appmestre, mas o
> **design system e sempre o nosso** (tokens de `globals.css`, sem o visual azul
> Material do concorrente, sem emoji, sem caixa neon). Anti slop sempre.

---

## 1. Contexto e referencia

O concorrente (video transcrito de um anuncio) usa tres alavancas no momento do
agendamento para subir o ticket, de forma automatica e sem depender da equipe:

1. **Order bump ("Aproveite tambem")** na tela de resumo: produtos de balcao
   (pomada, cera, sobrancelha) com um botao de adicionar, junto de um resumo do
   agendamento.
2. **Cashback como isca**: "faltam R$18 para liberar o cashback". O cliente
   adiciona produtos para nao perder o beneficio. Ao adicionar, o cashback
   destrava ("voce ganhou R$5,25 para a proxima visita").
3. **Cupom (opcional)**: campo de cupom no resumo, com subtotal + produtos
   adicionais + total.
4. **Upsell pos-confirmacao**: depois de confirmar, oferece um SERVICO extra com
   desconto ("Barba de R$40 por R$29,20 / Adicionar ao atendimento / Seguir sem
   adicionar"). O ticket do exemplo sobe de R$40 para R$104,20.

Frames de referencia (apenas fluxo/UX, ver secao 9 para a descricao de cada um).

**O que adaptamos para a barbearia:**
- Order bump = produtos de balcao que o **dono** cadastra no painel.
- Cupom = sistema proprio, espelhando o pipeline do appmestre.
- Upsell = oferta de **servico** extra com desconto na pagina de obrigado.
- Cashback = ver secao 7 (o concorrente usa; o appmestre nao tem; nos ja temos o
  **sistema de incentivo/desconto** como nossa isca. Cashback fica como futuro
  opcional, decisao do Eduardo).

---

## 2. Arquitetura de dados (o "hall do que foi adquirido")

**Problema atual:** um `Booking` tem UM unico servico (`serviceId`, `price`,
`durationMin`). Order bump (produtos) e upsell (servico extra) transformam o
agendamento num **pedido com varios itens**. Precisamos de uma camada de itens.

### 2.1 Novo modelo `Product` (produto de balcao, gerenciado pelo dono)
```prisma
model Product {
  id          String  @id @default(cuid())
  tenantId    String
  tenant      Tenant  @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  name        String
  description String?
  price       Float
  imageUrl    String?   // opcional; se usar, transcodar p/ WebP (diretriz assets leves)
  active      Boolean   @default(true)
  isOrderBump Boolean   @default(false) // aparece no bloco "Aproveite tambem"
  sortOrder   Int       @default(0)
  bookingItems BookingItem[]
  @@index([tenantId])
}
```

### 2.2 Novo modelo `BookingItem` (linha do pedido = o "hall do que foi adquirido")
```prisma
model BookingItem {
  id         String          @id @default(cuid())
  bookingId  String
  booking    Booking         @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  kind       BookingItemKind // SERVICE | PRODUCT | UPSELL_SERVICE
  refId      String          // serviceId ou productId de origem
  name       String          // snapshot do nome (preco/nome mudam, o item nao)
  unitPrice  Float           // snapshot do preco no momento da compra
  quantity   Int             @default(1)
  createdAt  DateTime        @default(now())
  productId  String?
  product    Product?        @relation(fields: [productId], references: [id])
  @@index([bookingId])
}

enum BookingItemKind { SERVICE PRODUCT UPSELL_SERVICE }
```

> Snapshot de `name`/`unitPrice` e proposital: se o dono muda o preco do produto
> depois, o que foi vendido nao muda. Mesmo motivo do `Booking.price` ja existir
> separado do `Service.price`.

### 2.3 Ajustes no `Booking`
- `Booking.price` continua sendo o preco do servico principal (compatibilidade).
- Adicionar campos derivados/agregados:
  - `itemsTotal Float @default(0)` (soma dos BookingItem; mantido na escrita).
  - `couponId String?` + relacao `Coupon`.
  - `couponDiscount Float @default(0)` (desconto do cupom aplicado).
  - `orderTotal Float?` (servico + itens - cupom; o "Total a Pagar").
- O `chargeAmount` (ja existe, valor do PIX) passa a ser calculado a partir do
  `orderTotal` (ainda respeitando sinal/total + o desconto de incentivo atual).

### 2.4 Como aparece para o dono (master)
- **Detalhe do agendamento / agenda**: alem do chip de pagamento ja existente,
  listar os `BookingItem` (servico + produtos + upsell) com valores. Esse e o
  "hall do que foi adquirido" pedido pelo Eduardo.
- **Recebimentos** (em `/painel/pagamentos`): hoje soma `paidAmount`. Passa a
  refletir o `orderTotal` pago, com quebra opcional por tipo (servicos x
  produtos) para o dono ver de onde veio a receita.

### 2.5 Interacao com o pagamento ja existente (cuidado)
Estas features COMPOEM com o checkout PIX ja no ar. Pontos de atencao:
- **Ordem de calculo do valor cobrado:** `base = service + produtos`, depois
  `cupom`, depois `incentivo (sinal/total)`. Definir a ordem exata (ver decisoes).
- **Piso do PIX (`ASAAS_PIX_MIN` = R$5):** order bumps SOBEM o valor (sem risco);
  cupom pode DERRUBAR abaixo do piso (mesmo tratamento que ja fizemos pro
  incentivo: esconder modo inviavel / avisar).
- **Split de 2%:** continua sobre o valor cobrado (com itens e cupom). Justo.
- **`chargeAmount` como fonte da verdade:** ja gravamos o valor cobrado no
  booking; o `BookingItem`/cupom entram nesse calculo na criacao, e
  webhook/cron/polling seguem usando `chargeAmount` (nao recomputar).
- **Idempotencia/race:** o cupom precisa de reserva atomica (secao 4); a reserva
  do horario (advisory lock) ja esta resolvida e nao muda.

---

## 3. Feature A: Order bumps ("Aproveite tambem")

**Objetivo:** o dono cadastra produtos de balcao; o cliente adiciona no resumo do
agendamento (etapa 4) antes de pagar; o valor entra no total.

### Admin (master, `/painel`)
- Nova area "Produtos" (ou dentro de Servicos): CRUD de `Product`
  (nome, preco, descricao, imagem opcional, ativo, "mostrar no checkout"
  = `isOrderBump`, ordem).
- UI no nosso design system (cards iguais aos de servico do painel).

### Cliente (etapa 4, `b/[slug]/confirmar`)
- Bloco "Aproveite tambem" abaixo do resumo, antes dos botoes de pagamento.
- Lista os `Product` com `isOrderBump = true` e `active`.
- Cada produto: nome, preco, botao adicionar/remover (toggle). Sem checkbox feio
  estilo concorrente; usar o padrao de selecao da plataforma.
- O total no botao de pagamento atualiza ao vivo (servico + produtos
  selecionados, ja com o desconto de incentivo do servico se houver).

### Backend
- O checkout (`/api/barber/checkout`) recebe `productIds: string[]`.
- Valida cada produto (existe, ativo, do tenant), cria os `BookingItem`
  (kind=PRODUCT, snapshot de nome/preco), soma no `itemsTotal`/`orderTotal`.
- O valor do PIX passa a considerar o total do pedido.

### Decisoes (secao 8): produto no PIX vs balcao; estoque; quantidade > 1.

---

## 4. Feature B: Cupons (espelhando o appmestre)

Modelo e pipeline adaptados do appmestre (`Coupon` + `CouponRedemption`,
`src/actions/coupon-actions.ts`), simplificados para o escopo barbearia.

### 4.1 Modelo
```prisma
model Coupon {
  id            String   @id @default(cuid())
  tenantId      String
  tenant        Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  code          String   // unico por tenant
  description   String?
  type          CouponType // PERCENTAGE | FIXED_AMOUNT
  value         Float      // 20 = 20% (PERCENTAGE) ou R$20 (FIXED_AMOUNT)
  minAmount     Float?     // valor minimo do pedido
  maxUses       Int?       // null = ilimitado
  usedCount     Int      @default(0)
  maxPerClient  Int      @default(1)
  startsAt      DateTime @default(now())
  expiresAt     DateTime?
  active        Boolean  @default(true)
  redemptions   CouponRedemption[]
  bookings      Booking[]
  @@unique([tenantId, code])
  @@index([tenantId, active])
}

enum CouponType { PERCENTAGE FIXED_AMOUNT }

model CouponRedemption {
  id             String   @id @default(cuid())
  couponId       String
  coupon         Coupon   @relation(fields: [couponId], references: [id], onDelete: Cascade)
  clientId       String   // nosso Client (escopo barbearia), nao userId global
  bookingId      String?
  originalAmount Float
  discountAmount Float
  finalAmount    Float
  createdAt      DateTime @default(now())
  @@index([couponId])
  @@index([clientId])
}
```
> Cliente identificado pelo `Client` (telefone) do tenant, ja que o funil publico
> nao tem login. `maxPerClient` conta redemptions por (couponId, clientId).

### 4.2 Pipeline de validacao (adaptado dos ~10 checks do appmestre)
Ordem: 1) existe e e do tenant; 2) `active`; 3) janela `startsAt`/`expiresAt`;
4) limite total `usedCount < maxUses`; 5) limite por cliente
(`count(redemptions por clientId) < maxPerClient`); 6) `minAmount` atendido;
7) calculo do desconto:
```
PERCENTAGE: discount = round2(amount * value/100)
FIXED_AMOUNT: discount = round2(value)
discount = min(discount, amount)           // nunca passa do total
final = amount - discount                  // pode ser 0
```

### 4.3 Reserva atomica (race-safe, igual appmestre)
```sql
UPDATE "Coupon" SET "usedCount" = "usedCount" + 1
WHERE id = $1 AND ("maxUses" IS NULL OR "usedCount" < "maxUses")
```
Se 0 linhas: cupom esgotou na corrida -> recusar. Registrar `CouponRedemption`
so quando o pagamento confirmar (ou na criacao, se for agendamento gratis).
Cuidado com o rollback: se o PIX falhar/expirar, **liberar** a reserva
(decrementar `usedCount` e remover a redemption) para o cupom nao "vazar".

### 4.4 Onde aplica
- **Rota publica** `POST /api/barber/coupon/validate` (no `PUBLIC_PATHS`),
  com rate limit por IP (ja temos `lib/rate-limit`). Recebe `{ tenantSlug, code,
  amount, clientPhone }`, retorna `{ valid, discount, final }` ou erro.
- **Etapa 4**: campo "Cupom (opcional)" no resumo, com debounce e estado de
  validando/valido/erro (igual padrao do appmestre, visual nosso).
- **Checkout**: o `/api/barber/checkout` revalida o cupom no servidor (nunca
  confiar no front), reserva atomicamente, aplica no `orderTotal`, grava
  `couponId`/`couponDiscount` no booking, e cria a redemption.

### 4.5 Admin
- Area "Cupons" no painel: CRUD (codigo, tipo, valor, minimo, limites, validade,
  ativo) + lista com usos. Botao "gerar codigo". Visual no nosso design system.

### 4.6 Interacao com o piso do PIX e o incentivo
- Cupom + incentivo juntos podem derrubar o PIX abaixo de R$5: aplicar o mesmo
  tratamento ja feito (esconder modo inviavel no front, avisar o dono). Definir a
  ordem cupom x incentivo (secao 8).

---

## 5. Feature C: Upsell pos-confirmacao (servico extra com desconto)

**Objetivo:** depois de confirmar o agendamento, oferecer UM servico extra com
desconto ("Barba de R$40 por R$29"), no mesmo horario, com 1 clique.

### Config (admin)
- Modelo `UpsellOffer` (por tenant): servico-gatilho (ou "qualquer"), servico
  ofertado, preco/desconto da oferta, ativo. Comecar simples: uma oferta por
  tenant (ou por servico principal).
```prisma
model UpsellOffer {
  id              String  @id @default(cuid())
  tenantId        String
  tenant          Tenant  @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  triggerServiceId String? // null = vale pra qualquer servico principal
  offerServiceId   String  // o servico ofertado
  discountPct      Int     @default(0) // 0..90
  active           Boolean @default(true)
  @@index([tenantId])
}
```

### Fluxo (pagina de obrigado / pos-confirmacao)
1. Booking confirmado (pago ou gratis).
2. Se ha `UpsellOffer` ativa compativel, mostrar overlay/secao no nosso design
   system: "Aproveite para complementar seu atendimento. {Servico} de R$X por
   R$Y." Botoes "Adicionar ao atendimento" / "Seguir sem adicionar".
3. Ao adicionar: cria `BookingItem` (kind=UPSELL_SERVICE), atualiza
   `orderTotal`/`durationMin`(?), e:
   - se o agendamento foi pago via PIX: gerar **nova cobranca** do valor do
     upsell (novo `asaasPaymentId`? ou somar?) OU marcar como "a pagar no balcao".
   - se foi gratis: somar ao que se paga no balcao.

### Decisoes pesadas aqui (secao 8): o upsell pos-pagamento gera novo PIX ou vira
saldo de balcao? Reaproveita a janela do horario (duracao)? So 1 oferta?

---

## 6. Telas do cliente afetadas (resumo)
- `b/[slug]/confirmar` (etapa 4): + bloco "Aproveite tambem" (produtos) + campo
  cupom + total do pedido recalculado.
- `b/[slug]/sucesso` (obrigado): + bloco de upsell. (Ja tem o QR de avaliacao
  Google.)

---

## 7. Cashback (referencia / futuro opcional)
- O concorrente usa cashback como isca ("faltam R$X para liberar"). O appmestre
  **nao tem** cashback. Nos ja temos o **sistema de incentivo/desconto** (pagar
  adiantado = % off) como nossa isca, ja no ar.
- Cashback (credito pra proxima visita) seria desenvolvimento novo: modelo de
  saldo por `Client`, regra de acumulo, regra de resgate. Fica como **futuro
  opcional** ate o Eduardo decidir se quer cashback alem do desconto.

---

## 8. Decisoes em aberto (precisam do Eduardo antes de implementar)
1. **Produtos no PIX:** produto de balcao entra na cobranca PIX (cliente paga
   junto) ou e sempre "pago no balcao" e so registrado? (O concorrente cobra
   junto.)
2. **Ordem do desconto:** cupom incide sobre (servico + produtos) e depois o
   incentivo sinal/total? Ou incentivo so sobre o servico? Definir a formula
   exata do `chargeAmount`.
3. **Upsell pos-pagamento:** gera nova cobranca PIX separada, ou vira saldo de
   balcao? (Cobranca nova e mais receita garantida, mas mais friccao.)
4. **Quantidade de produto > 1?** Ou cada bump e 1 unidade?
5. **Estoque de produtos?** Controlar quantidade disponivel ou nao.
6. **Cashback sim ou nao** (secao 7), ou ficamos so no desconto de incentivo.
7. **Upsell: uma oferta por tenant** pra MVP, ou por servico principal?

---

## 9. Plano por fases (sugestao)
- **Fase 1 (dados):** modelos `Product`, `BookingItem`, `Coupon`,
  `CouponRedemption`, `UpsellOffer` + ajustes no `Booking`
  (itemsTotal/orderTotal/couponId/couponDiscount). `db push` aditivo.
- **Fase 2 (order bumps):** admin de Produtos + bloco "Aproveite tambem" na
  etapa 4 + checkout aceitando `productIds` + total no pedido + superficie do
  dono (itens no detalhe do booking).
- **Fase 3 (cupons):** rota de validacao + reserva atomica + admin de cupons +
  campo na etapa 4 + aplicacao no checkout + rollback no expire/fail.
- **Fase 4 (upsell):** `UpsellOffer` + admin + bloco na pagina de obrigado +
  fluxo de adicionar (definir pagamento conforme decisao 3).
- **Fase 5 (hardening):** revisao adversarial multi-agente da matematica
  (cupom x incentivo x piso PIX x split), idempotencia (reserva de cupom,
  rollback), e verificacao ao vivo. (Mesmo padrao que pegou bugs reais nas
  features anteriores.)
- **Fase 6 (opcional):** cashback, se decidido.

---

## 10. Frames de referencia do concorrente (descricao do fluxo)
> Nao consegui salvar os PNGs (anexos do chat nao viram arquivo em disco); abaixo
> o que cada frame mostra, pra servir de referencia de UX (design proprio, nao o
> deles).

1. **Resumo + Aproveite tambem (topo):** stepper concluido (Servico, Profissional,
   Data e Hora, Confirmar), card "Resumo do Agendamento" (servico Corte Masculino
   R$40, profissional, data/hora, duracao), e abaixo "Aproveite tambem - Itens
   recomendados para seu servico" com produtos (Cera Modeladora R$35, Sobrancelha
   R$15) com botao +.
2. **Lista de produtos + Cashback:** mais produtos (Pomada Baboon R$79,90) e o
   bloco "CASHBACK - Beneficio nesta compra - Faltam R$18,73 para liberar o
   cashback".
3. **Cashback detalhado:** "Voce pode ganhar a partir de R$4,11 para sua proxima
   visita" + campo "Cupom (opcional)".
4. **Produto selecionado destrava cashback:** produto marcado, "Voce ganhou para
   usar na proxima visita R$5,25".
5. **Resumo financeiro:** cupom (opcional) + Subtotal R$40 + Produtos Adicionais
   (Cera R$35) + Total a Pagar R$75 + "Confirmar Agendamento".
6/7. **Upsell pos-confirmacao:** "Agendamento confirmado! Aproveite para
   complementar seu atendimento. Inclua este servico agora, no mesmo horario, com
   condicao especial. Barba De R$40 por R$29,20. Adicionar ao atendimento /
   Seguir sem adicionar."
8. **Obrigado final:** "Agendamento Confirmado! Investimento R$104,20" + extras
   (confirmacao instantanea, lembrete no WhatsApp, chegue 10 min antes).

---

_Atualizado por Claude (Opus 4.8) em jun/2026. Implementacao pendente; comecar
pela secao 8 (decisoes) com o Eduardo._
