//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    
    apiKey: "AIzaSyAk-f0UCgDF-Hsfem1dKdxw7ZWt5MDxqQA",
    authDomain: "comp1800-a3789.firebaseapp.com",
    projectId: "comp1800-a3789",
    storageBucket: "comp1800-a3789.appspot.com",
    messagingSenderId: "649524194613",
    appId: "1:649524194613:web:65e149acb40a64f9f7307c"

};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // creates a new database called "db"