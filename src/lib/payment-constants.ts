// Constantes de pagamento compartilhadas entre cliente e servidor. SEM imports
// de server (prisma etc.) pra poder ser usada em componentes client sem inchar
// o bundle nem vazar codigo de servidor.

/** Valor minimo de uma cobranca PIX na Asaas (R$). Abaixo disso a Asaas recusa. */
export const ASAAS_PIX_MIN = 5
