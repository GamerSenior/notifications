importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

var firebaseConfig = {
  apiKey: "AIzaSyDrnTUQM6uLEqFCk9024LRjFqNli9CoVAk",
  authDomain: "jamal-notifications.firebaseapp.com",
  projectId: "jamal-notifications",
  storageBucket: "jamal-notifications.appspot.com",
  messagingSenderId: "450673548894",
  appId: "1:450673548894:web:e1e3c7e1aac82a9b1f5ecf"
};

const app = firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  console.log(payload)
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    click_action: "/",
  };

  // const urlToOpen = new URL("/", self.location.origin).href
  const clients = await self.clients.matchAll({includeUncontrolled: true, type: 'window'})
  clients.forEach(client => {
    client.postMessage({...payload, backgroundMessage: true})
  })

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
