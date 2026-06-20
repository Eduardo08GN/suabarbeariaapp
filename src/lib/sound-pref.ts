// Preferencia do som de caixa: e um ajuste POR DISPOSITIVO (o tablet do balcao),
// entao mora no localStorage, nao no banco. Default: ligado.
const KEY = 'sba-sound'

export function isSoundOn(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(KEY) !== 'off'
}

export function setSoundOn(on: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, on ? 'on' : 'off')
}
