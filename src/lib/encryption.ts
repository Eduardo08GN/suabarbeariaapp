import crypto from 'crypto'

// AES-256-GCM. Portado do appmestre. Cifra credenciais (ex.: chave Asaas) em
// repouso. Chave derivada de ENCRYPTION_KEY (fallback JWT_SECRET). Lazy init:
// a env nao existe no momento do build do Docker, entao nao resolve no import.
const ALGORITHM = 'aes-256-gcm'
let cachedKey: Buffer | null = null

function getKey(): Buffer {
  if (cachedKey) return cachedKey
  const raw = process.env.ENCRYPTION_KEY || process.env.JWT_SECRET
  if (!raw) throw new Error('ENCRYPTION_KEY (ou JWT_SECRET) obrigatorio para cifrar credenciais')
  cachedKey = Buffer.from(raw.slice(0, 32).padEnd(32, '0'), 'utf-8')
  return cachedKey
}

/** Cifra um texto. Formato: iv:authTag:dados (hex). */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)
  let enc = cipher.update(text, 'utf8', 'hex')
  enc += cipher.final('hex')
  const tag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${tag.toString('hex')}:${enc}`
}

/** Decifra um payload no formato iv:authTag:dados. */
export function decrypt(payload: string): string {
  const parts = payload.split(':')
  if (parts.length !== 3) throw new Error('Formato cifrado invalido')
  const [ivHex, tagHex, enc] = parts
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivHex, 'hex'))
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'))
  let dec = decipher.update(enc, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

/** Decifra tolerante: se nao estiver no formato cifrado, devolve o valor cru. */
export function safeDecrypt(value: string | null | undefined): string {
  if (!value) return ''
  const parts = value.split(':')
  if (parts.length !== 3) return value
  const [ivHex, tagHex] = parts
  if (ivHex.length !== 32 || tagHex.length !== 32) return value
  if (!/^[0-9a-f]+$/.test(ivHex) || !/^[0-9a-f]+$/.test(tagHex)) return value
  try {
    return decrypt(value)
  } catch {
    return value
  }
}
