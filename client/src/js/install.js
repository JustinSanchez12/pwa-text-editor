const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredInstallPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent default browswer install prompt
    event.preventDefault;

    // Store the triggered events
    deferredInstallPrompt = event;

    butInstall.style.display = 'block';
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
      // Hide the install button after installation
      butInstall.style.display = 'none';
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
  const offlineCheckbox = document.getElementById('offlineCheckbox');
  if (offlineCheckbox.checked) {

    console.log('Loading data in editor...');
  }
});