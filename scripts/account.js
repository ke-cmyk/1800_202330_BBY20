var currentUser;               //points to the document of the user who is logged in
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

                            //if the data fields are not empty, then write them in to the form.
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
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

updateUserInfo();

function saveUserInfo() {
    userName = document.getElementById("name-input").value;
    userCity = document.getElementById("city-input").value;
    userPhone = document.getElementById("phone-input").value;

    currentUser.update({
        name: userName,
        city: userCity,
        phone: userPhone
    })
    .then(() => {
        console.log("Document successfully updated!");
        window.location.href = "account.html";
    })
}