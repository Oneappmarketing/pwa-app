
//importing scripts from firebase

importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-messaging.js');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Offline Service Worker Install
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

//Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener('install', function(event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[PWA Builder] Cached index page during Install'+ response.url);
        return cache.put(indexPage, response);
      });
  }));
});


///Page is offline

//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline'+response.url);
        return cache.put(request, response);
      });
    });
  };


  //if it fails 
  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );

      
      
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Return Our Cache Assets called 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
      
      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Firebase Push Messages config file
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var config = {
  apiKey: "AIzaSyB0G_JC7JAWaN2WzzxUvlSABSqy9z_2RpE",
  authDomain: "chatastrophe-b61bd.firebaseapp.com",
  databaseURL: "https://chatastrophe-b61bd.firebaseio.com",
  projectId: "chatastrophe-b61bd",
  storageBucket: "chatastrophe-b61bd.appspot.com",
  messagingSenderId: "827165645465"
  };
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  
  
  // Customize notification here
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon
  };

  //return the notification
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END background_handler]
