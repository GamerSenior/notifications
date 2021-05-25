import firebase from 'firebase/app'
import 'firebase/firebase-messaging'
import 'firebase/firebase-database'

var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  databaseURL: "DATABASE_URL",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
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
