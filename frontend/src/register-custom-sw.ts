export function registerCustomServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/custom-sw.js');
  }
}
