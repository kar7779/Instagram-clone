import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA9GZqMq_RJp3dtLUNV9zAul3u2VCu4Q10",
  authDomain: "instagram-clone-bbb5a.firebaseapp.com",
  databaseURL: "https://instagram-clone-bbb5a.firebaseio.com",
  projectId: "instagram-clone-bbb5a",
  storageBucket: "instagram-clone-bbb5a.appspot.com",
  messagingSenderId: "461758057631",
  appId: "1:461758057631:web:8dc603c0a0c5afbdbca6aa",
  measurementId: "G-CJFX5R58BS",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
