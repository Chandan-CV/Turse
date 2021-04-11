import firebase from "firebase";
const init = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyC8KCrPTZ8jGSZ3QqmuL_bT13r1ZBSshLg",
    authDomain: "ularn-f9812.firebaseapp.com",
    projectId: "ularn-f9812",
    storageBucket: "ularn-f9812.appspot.com",
    messagingSenderId: "679296968106",
    appId: "1:679296968106:web:04223ea462363cf72c37d3",
    measurementId: "G-CQKHF45NVM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

if (firebase.apps.length == 0) {
  init();
}


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();






const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = (history) => {
  auth.signInWithPopup(googleProvider).then((user) => {
    db.collection("Users")
      .doc(user.user.uid)
      .get()
      .then((snap) => {
        if (!snap.exists) {
          db.collection("Users").doc(user.user.uid).set({
            email: user.user.email,
            name: user.user.displayName,
            address: null,
            role: "user",
            timeOfCreation: firebase.firestore.FieldValue.serverTimestamp(),
            continue: null
          });
        }
        history.push("/");
      });
  });
};



export { db, auth, storage, signInWithGoogle, init, firebase };
