import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBPiUwtntuqMwvG2WZwcC3VBNg_ZA9KCfc",
    authDomain: "whatsapp-clone-ea11a.firebaseapp.com",
    projectId: "whatsapp-clone-ea11a",
    storageBucket: "whatsapp-clone-ea11a.appspot.com",
    messagingSenderId: "141403409407",
    appId: "1:141403409407:web:6f84a6ea33ad82627435ca",
    measurementId: "G-8RTV3CVP4Y"
  }; 

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;