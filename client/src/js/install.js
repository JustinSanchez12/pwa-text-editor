const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent default browswer install prompt
    event.preventDefault;

    // Store the triggered events
    window.deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      // Show the browser's installation prompt
      deferredInstallPrompt.prompt();
  
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredInstallPrompt.userChoice;
  
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
      } else {
        console.log('User declined the installation');
      }
  
      // Reset the deferredInstallPrompt variable
      deferredInstallPrompt = null;
    }
  });
  

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App was installed.', event);
    // You can perform additional actions here if needed.
  });
  