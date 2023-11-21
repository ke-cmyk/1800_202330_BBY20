//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyA5N83JGSjh6CeiOBJQhf1FXLE6m7UrFr8",
    authDomain: "autobridge20.firebaseapp.com",
    projectId: "autobridge20",
    storageBucket: "autobridge20.appspot.com",
    messagingSenderId: "1052859416208",
    appId: "1:1052859416208:web:6896c0166e119a211c6215"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // creates a new database called "db"

// var userID = null;

var userID = null;

function authenticateUser(callback) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userID = user.uid;
            console.log(userID);
            callback(); // Call the callback function after setting userID
        } else {
            console.log("user is not signed in.");
        }
    });
}