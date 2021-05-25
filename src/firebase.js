import firebase from 'firebase/app'
import 'firebase/firebase-messaging'
import 'firebase/firebase-database'

var firebaseConfig = {
  apiKey: "AIzaSyDrnTUQM6uLEqFCk9024LRjFqNli9CoVAk",
  authDomain: "jamal-notifications.firebaseapp.com",
  projectId: "jamal-notifications",
  storageBucket: "jamal-notifications.appspot.com",
  databaseURL: "https://jamal-notifications-default-rtdb.firebaseio.com",
  messagingSenderId: "450673548894",
  appId: "1:450673548894:web:e1e3c7e1aac82a9b1f5ecf"
};


firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();
const database = firebase.database();

messaging.onMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received message ', payload);
  // Customize notification here
  console.log(payload)
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  new Notification(notificationTitle, notificationOptions)
});

export { messaging, database }