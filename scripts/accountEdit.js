var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
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
                    var userCity = userDoc.data().city;
                    var userPhone = userDoc.data().phone;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("name-input").value = userName;
                    }
                    if (userCity != null) {
                        document.getElementById("city-input").value = userCity;
                    }
                    if (userPhone != null) {
                        document.getElementById("phone-input").value = userPhone;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
populateUserInfo();

function saveUserInfo() {
    currentUser = db.collection("users").doc(user.uid)
    userName = document.getElementById("name-input").value;
    userCity = document.getElementById("city-input").value;
    userPhone = document.getElementById("phone-input").value;
    var storageRef = storage.ref("User Profile Pictures/" + currentUser.uid + ".jpg");

    const fileInput = document.getElementById("photo-input");

    var ImageFile;
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];
    })

    storageRef.put(ImageFile)
        .then(function () {
            console.log('Uploaded to Cloud Storage.');

            //Asynch call to get URL from Cloud
            storageRef.getDownloadURL()
                .then(function (url) { // Get "url" of the uploaded file
                    console.log("Got the download URL.");

                    currentUser.update({
                        name: userName,
                        city: userCity,
                        phone: userPhone,
                        profile: url
                    })
                        .then(() => {
                            console.log("Document successfully updated!");
                            window.location.href = "account.html";
                        })
                })
        })
}