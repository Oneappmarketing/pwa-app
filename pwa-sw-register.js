

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SERVICE WORKER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

//success
if (navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register')
} else {
  
  
    //Register the ServiceWorker pwa-sw-v2 file
  navigator.serviceWorker.register('pwa-sw-v2.js', {
    scope: './'
  }).then((registration) => {
      messaging.useServiceWorker(registration);
      messaging.requestPermission()
              .then(function () {
                  console.log('Notification permission granted.');
                  return messaging.getToken();
              })
              .then(function (currentToken) {
                  var desk_token = currentToken;
                  if (desk_token != '') {
                      var urls = "https://app.progressiveappsbuilder.com/save_notification_token";
                      $.get(urls,
                        {
                            token: currentToken,
                            domain: window.location.hostname
                        },
                        function(data, status){
                            console.log(data);
                        });
                  }
                  console.log(currentToken);
              })
              .catch(function (err) {
                  console.log('Unable to get permission to notify.', err);
              });
      messaging.onMessage(function (payload) {
          return self.registration.showNotification(notificationTitle,notificationOptions);
      });
  });
}
