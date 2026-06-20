// Service worker da SuaBarbeariaApp. Minimo de proposito: habilita instalacao
// (Android exige um handler de fetch) e Web Push. Sem cache agressivo pra nao
// servir conteudo velho — passthrough de rede.

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

// passthrough: presenca do handler satisfaz a instalabilidade, sem cachear
self.addEventListener('fetch', () => {})

// Web Push: mostra a notificacao com o payload do servidor
self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = { title: 'SuaBarbeariaApp', body: event.data ? event.data.text() : '' }
  }
  const title = data.title || 'SuaBarbeariaApp'
  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.tag,
    data: { url: data.url || '/' },
    vibrate: [80, 40, 80],
  }
  event.waitUntil(
    (async () => {
      await self.registration.showNotification(title, options)
      // avisa as abas abertas (painel no balcao) pra tocar o som de caixa
      const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      for (const c of wins) c.postMessage({ type: 'new-booking', tag: data.tag })
    })()
  )
})

// clique abre/foca a tela alvo
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes(url) && 'focus' in c) return c.focus()
      }
      return self.clients.openWindow(url)
    })
  )
})
