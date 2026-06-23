import 'server-only'

// Notificacoes transacionais via Brevo. Email na Fase 1; WhatsApp na Fase 2
// (mesmo provider/key, endpoint /v3/whatsapp/sendMessage + template aprovado).
// Tudo best-effort: falha de envio NUNCA quebra o fluxo de booking/pagamento.

const BREVO_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'

// o nome do cliente vem de input do funil publico — escapar p/ nao injetar HTML
const esc = (s: string) =>
  String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string))

export interface BookingInfo {
  clientName: string
  serviceName: string
  barberName: string
  quando: string // ja formatado no fuso do tenant, ex.: "25/06 14:00"
}

/** Envia um email transacional pelo Brevo. Retorna true se aceito. */
export async function sendEmail(
  to: { email: string; name?: string },
  subject: string,
  html: string
): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return false
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@suabarbearia.app'
  const senderName = process.env.BREVO_SENDER_NAME || 'SuaBarbearia'
  try {
    const res = await fetch(BREVO_EMAIL_URL, {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: to.email, name: to.name }],
        subject,
        htmlContent: html,
      }),
    })
    if (!res.ok) {
      console.error('[brevo] email falhou:', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (e) {
    console.error('[brevo] email erro:', e)
    return false
  }
}

/** Email de "novo agendamento" — usado pro dono e pro barbeiro do agendamento. */
export async function sendBookingEmail(
  to: { email: string; name?: string },
  info: BookingInfo
): Promise<boolean> {
  const subject = `Novo agendamento: ${info.clientName} (${info.quando})`
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#18181b;max-width:480px;margin:0 auto;padding:8px">
      <h2 style="font-size:18px;margin:0 0 12px">Novo agendamento</h2>
      <table style="font-size:14px;line-height:1.7;border-collapse:collapse">
        <tr><td style="color:#71717a;padding-right:16px">Cliente</td><td><strong>${esc(info.clientName)}</strong></td></tr>
        <tr><td style="color:#71717a;padding-right:16px">Serviço</td><td>${esc(info.serviceName)}</td></tr>
        <tr><td style="color:#71717a;padding-right:16px">Profissional</td><td>${esc(info.barberName)}</td></tr>
        <tr><td style="color:#71717a;padding-right:16px">Quando</td><td>${esc(info.quando)}</td></tr>
      </table>
    </div>`
  return sendEmail(to, subject, html)
}
