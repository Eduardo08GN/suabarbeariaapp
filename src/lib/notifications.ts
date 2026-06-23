import 'server-only'

// Notificacoes transacionais via Brevo. Email na Fase 1; WhatsApp na Fase 2
// (mesmo provider/key, endpoint /v3/whatsapp/sendMessage + template aprovado).
// Tudo best-effort: falha de envio NUNCA quebra o fluxo de booking/pagamento.

const BREVO_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'
const PRODUCT_NAME = 'SuaBarbearia'
// Fonte do design system (globals.css --font-sans). Clientes que suportam web
// font (Apple Mail/iOS) carregam Plus Jakarta Sans via <link>; o resto cai no
// system-ui. SEM Arial/Inter/Roboto (proibidos no design system).
const FONT = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"

// o nome do cliente vem de input do funil publico — escapar p/ nao injetar HTML
const esc = (s: string) =>
  String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string))

// marca da barbearia (white-label) usada no cabecalho/rodape do email
export interface Brand {
  shopName: string
  logoUrl?: string | null
  accent?: string | null // cor primaria do tenant (hex)
}

interface ShellInput extends Brand {
  preheader: string // texto de previa (some no corpo, aparece na lista da inbox)
  heading: string
  intro?: string // paragrafo de abertura (HTML confiavel; nomes ja escapados)
  highlight?: { label: string; value: string } // destaque da info principal (ex.: horario)
  rows: Array<[string, string]> // [label, valor] — valor e escapado aqui
  outro?: string // paragrafo de fecho (HTML confiavel)
  footerNote: string // linha do rodape explicando o porque do email
}

// Shell de email "enterprise": table-based (resiste a Gmail/Outlook/Apple Mail),
// inline styles, largura travada, card branco com barra de acento da barbearia,
// cabecalho com logo+nome e rodape sobrio com assinatura do produto.
function emailShell(o: ShellInput): string {
  const accent = o.accent && /^#[0-9a-fA-F]{6}$/.test(o.accent) ? o.accent : '#18181B'
  const shop = esc(o.shopName)
  const brandMark = o.logoUrl
    ? `<img src="${esc(o.logoUrl)}" width="48" height="48" alt="" style="display:block;width:48px;height:48px;border-radius:12px;object-fit:cover;border:1px solid #E4E4E7" />`
    : `<span style="display:inline-block;width:48px;height:48px;line-height:48px;text-align:center;border-radius:12px;background:${accent};color:#ffffff;font-size:20px;font-weight:700;font-family:${FONT}">${shop.charAt(0).toUpperCase() || 'B'}</span>`

  const highlight = o.highlight
    ? `<p style="margin:18px 0 4px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#71717a">${esc(o.highlight.label)}</p>
            <p style="margin:0 0 20px;font-family:${FONT};font-size:23px;line-height:1.2;font-weight:700;color:#09090b;letter-spacing:-0.02em">${esc(o.highlight.value)}</p>`
    : ''

  const rows = o.rows
    .map(
      ([label, value]) => `
            <tr>
              <td style="padding:9px 0;color:#71717a;font-size:14px;line-height:1.4;width:128px;vertical-align:top;font-family:${FONT}">${esc(label)}</td>
              <td style="padding:9px 0;color:#09090B;font-size:14px;line-height:1.4;font-weight:600;font-family:${FONT}">${esc(value)}</td>
            </tr>`
    )
    .join('')

  return `<!doctype html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>${esc(o.heading)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');body,table,td,p,h1,span{font-family:${FONT}}</style>
</head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:${FONT};-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%">
<span style="display:none!important;visibility:hidden;mso-hide:all;opacity:0;height:0;width:0;overflow:hidden;font-size:1px;line-height:1px;color:#FAFAFA">${esc(o.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAFA">
  <tr>
    <td align="center" style="padding:40px 16px">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:520px;max-width:520px;background:#FFFFFF;border:1px solid #E4E4E7;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,0.04)">
        <tr>
          <td style="padding:30px 32px 0">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:middle;padding-right:14px">${brandMark}</td>
                <td style="vertical-align:middle;font-family:${FONT};font-size:16px;font-weight:700;color:#09090B;letter-spacing:-0.01em">${shop}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 8px">
            <h1 style="margin:0 0 12px;font-family:${FONT};font-size:22px;line-height:1.3;color:#09090B;font-weight:700;letter-spacing:-0.02em">${esc(o.heading)}</h1>
            ${o.intro ? `<p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.65;color:#3F3F46">${o.intro}</p>` : ''}
            ${highlight}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-top:1px solid #F4F4F5;border-bottom:1px solid #F4F4F5;margin:${o.highlight ? '0' : '18px'} 0 18px">${rows}
            </table>
            ${o.outro ? `<p style="margin:0 0 6px;font-family:${FONT};font-size:13px;line-height:1.65;color:#71717a">${o.outro}</p>` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 30px">
            <div style="border-top:1px solid #F4F4F5;margin:0 0 16px;line-height:1px;font-size:0">&nbsp;</div>
            <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;line-height:1.6;color:#a1a1aa">${o.footerNote}</p>
            <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:#a1a1aa">Mensagem automática. Não é necessário responder.</p>
          </td>
        </tr>
      </table>
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:520px;max-width:520px">
        <tr>
          <td align="center" style="padding:18px 0 4px;font-family:${FONT};font-size:11px;line-height:1.5;color:#A1A1AA;letter-spacing:0.02em">
            Agendamentos por <span style="color:#71717A;font-weight:600">${PRODUCT_NAME}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
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
  const senderName = process.env.BREVO_SENDER_NAME || PRODUCT_NAME
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

export interface BookingInfo extends Brand {
  clientName: string
  serviceName: string
  barberName: string
  quando: string // ja formatado no fuso do tenant, ex.: "25/06 14:00"
}

export interface ReminderInfo extends Brand {
  clientName: string
  serviceName: string
  barberName: string
  quando: string // ja formatado no fuso do tenant, ex.: "ter., 25/06 às 14:00"
}

/** Email de "novo agendamento" — pro dono e pro barbeiro do agendamento. */
export async function sendBookingEmail(
  to: { email: string; name?: string },
  info: BookingInfo
): Promise<boolean> {
  const subject = `Novo agendamento: ${info.clientName}`
  const html = emailShell({
    shopName: info.shopName,
    logoUrl: info.logoUrl,
    accent: info.accent,
    preheader: `${info.clientName} marcou ${info.serviceName} para ${info.quando}.`,
    heading: 'Novo agendamento',
    intro: `Um novo horário acaba de ser marcado na <strong>${esc(info.shopName)}</strong>.`,
    highlight: { label: 'Quando', value: info.quando },
    rows: [
      ['Cliente', info.clientName],
      ['Serviço', info.serviceName],
      ['Profissional', info.barberName],
    ],
    footerNote: `Notificação enviada aos responsáveis pela agenda da ${esc(info.shopName)}.`,
  })
  return sendEmail(to, subject, html)
}

/** Lembrete enviado AO CLIENTE ~1 dia antes do horario (cron /api/cron/reminders).
    Tom de cliente, sem jargao, com a marca da barbearia. */
export async function sendClientReminderEmail(
  to: { email: string; name?: string },
  info: ReminderInfo
): Promise<boolean> {
  const subject = `Lembrete: seu horário amanhã na ${info.shopName}`
  const html = emailShell({
    shopName: info.shopName,
    logoUrl: info.logoUrl,
    accent: info.accent,
    preheader: `${info.serviceName} com ${info.barberName}, ${info.quando}.`,
    heading: 'Seu horário é amanhã',
    intro: `Oi, ${esc(info.clientName)}! Passando pra lembrar do seu horário na <strong>${esc(info.shopName)}</strong>.`,
    highlight: { label: 'Seu horário', value: info.quando },
    rows: [
      ['Serviço', info.serviceName],
      ['Profissional', info.barberName],
    ],
    outro: 'Qualquer imprevisto, é só falar com a gente pra remarcar. Te esperamos!',
    footerNote: `Você recebeu este e-mail porque tem um horário marcado na ${esc(info.shopName)}.`,
  })
  return sendEmail(to, subject, html)
}
