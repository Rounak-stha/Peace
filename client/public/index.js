// let deferredPrompt;

// check if browser supports service-worker
if ('serviceWorker' in navigator) { // The Navigator interface represents the state and the identity of the user agent.
    navigator.serviceWorker.register('%PUBLIC_URL%/service-worker.js')
    .then((registration) => console.log('service workder registered, scope: ', registration.scope ))
    .catch((err) => console.log('service worker not registered, error: ', err))
  }
  else console.log('Service Worker not supported');

  
  /* window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    // deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    console.log("can install")
    showInstallPromotion();
  }); */