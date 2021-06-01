import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBAU7Do4mIGl0pca4_hksOIgnveb_vcEE",
  authDomain: "aapi-origins.firebaseapp.com",
  projectId: "aapi-origins",
  storageBucket: "aapi-origins.appspot.com",
  messagingSenderId: "832707772160",
  appId: "1:832707772160:web:64e6b8470fd4481c82fde5",
  measurementId: "G-KSTY04HXQE"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;