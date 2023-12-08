/* Loaded on:
 * account.html
 */

/** points to the document of the user who is logged in. */
var currentUser;

/**
 * Loads the user's information, such as their name and profile picture.
 * The profile picture is loaded by setting the source of the image to where it is stored in Firebase Storage.
 */
function updateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userCity = userDoc.data().city;
                    var userPhone = userDoc.data().phone;
                    var userPicture = userDoc.data().profile;

                    //if the data fields are not empty, write them in to the form.
                    if (userName != null) {
                        document.getElementById("user-name-display").textContent = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("user-email-display").textContent = userEmail;
                    }
                    if (userCity != null) {
                        document.getElementById("user-city-display").textContent = userCity;
                    }
                    if (userPhone != null) {
                        document.getElementById("user-phone-display").textContent = userPhone;
                    }
                    if (userPicture != null) {
                        document.getElementById("user-profile-image").setAttribute("src", userPicture);
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
updateUserInfo();

/**
 * Signs out the user.
 */
function signOut() {
    firebase.auth().signOut();
}