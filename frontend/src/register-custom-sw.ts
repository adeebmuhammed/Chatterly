export function registerCustomServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/custom-sw.js', { scope: '/' })
      .then((reg) => console.log('SW Registered', reg))
      .catch((err) => console.error('SW registration failed', err));
  }
}
