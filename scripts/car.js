authenticateUser(() => {
    displayVehicleInfo();
    let params = new URL(window.location.href);
    let vehicleID = params.searchParams.get("vehicleID");
    requestsCollectionRef = db.collection("requests").where("requesterID", "==", userID).where("vehicleID", "==", vehicleID);
    requestsCollectionRef.get().then((requestRef) => {
        requestRef.forEach(doc => {
            console.log(doc.id)
            if (doc) {
                document.querySelector("#request-button").setAttribute("onclick", "deleteRequest()");
                document.querySelector("#request-button").textContent = "Delete Request";
            }
        })

    })
})

/**
 * Grabs the vehicleID from the url and searches db for the id. Then, it populates the image container and vehicle info fields.
 */
function displayVehicleInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"
    console.log(vehicleID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("vehicles")
        .doc(vehicleID)
        .get()
        .then(doc => {
            thisVehicle = doc.data();
            vehicleYear = thisVehicle.year;
            vehicleMake = thisVehicle.make;
            vehicleModel = thisVehicle.model;
            vehicleType = thisVehicle.type;
            vehicleFuel = thisVehicle.fuel;
            vehicleImage2 = thisVehicle.img[1];

            // Insert image
            document.getElementById("vehicle-image-preview").setAttribute("src", vehicleImage2);

            // populate name
            document.getElementById("vehicle-name-display").textContent = `${vehicleYear} ${vehicleMake} ${vehicleModel}`;

            // populate fuel & type
            document.getElementById("vehicle-type-display").innerHTML = "Type: " + vehicleType;
            document.getElementById("vehicle-fuel-display").innerHTML = "Engine: " + vehicleFuel;

            // uncomment when image stuff is sorted
            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        });
}

/**
 * Sets visibility of warning page when the request button is clicked.
 *
 * @event click #request-button
 */
function createRequest() {
    if (localStorage.getItem("hideRequestWarning") != "true") {
        document.querySelector("#popup-container").style.visibility = "visible";

        document.querySelector("#cancel-request").addEventListener("click", () => {
            localStorage.setItem("hideRequestWarning", document.querySelector("#request-info-hide").checked);
            document.querySelector("#popup-container").style.visibility = "hidden";
        })
    } else {
        addRequestToFirestore();
    }
}

/**
 * Adds a request to the db under requests collection and user request array.
 * Sets visibility for warning menu and success menu.
 * Switches the onclick attribute from createRequest to deleteRequest.
 */
function addRequestToFirestore() {
    vehicleID = window.location.href.substring(window.location.href.indexOf("=") + 1);
    db.collection("requests").add({
        requestDate: firebase.firestore.FieldValue.serverTimestamp(),
        requesterID: userID,
        vehicleID: vehicleID
    })
        .then((requestRef) => {
            console.log("Document successfully written!");
            db.collection("users").doc(userID).update({
                requests: firebase.firestore.FieldValue.arrayUnion(requestRef.id),
                vehicles: firebase.firestore.FieldValue.arrayUnion(vehicleID)
            })

            // Success Menu
            document.querySelector("#success-container").style.visibility = "visible";

            document.querySelector("#return-button").addEventListener("click", () => {
                document.querySelector("#success-container").style.visibility = "hidden";
            })
            document.querySelector("#request-button").setAttribute("onclick", "deleteRequest()");
            document.querySelector("#request-button").textContent = "Delete Request";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

/**
 * Deletes the request of the current vehicle page from the requests collection and user request array
 */
function deleteRequest() {
    vehicleID = window.location.href.substring(window.location.href.indexOf("=") + 1);
    requestsCollectionRef = db.collection("requests").where("requesterID", "==", userID).where("vehicleID", "==", vehicleID);

    requestsCollectionRef.get()
        .then(requestRef => {
            requestRef.forEach(doc => {
                if (doc.id != "") {
                    db.collection("users").doc(userID).update({
                        requests: firebase.firestore.FieldValue.arrayRemove(doc.id),
                        vehicles: firebase.firestore.FieldValue.arrayRemove(vehicleID)
                    });
                    db.collection("requests").doc(doc.id).delete().then(() => {
                        console.log("request successfully deleted")
                        document.querySelector("#request-button").textContent = "Request This Car";
                        document.querySelector("#request-button").setAttribute("onclick", "createRequest()");
                    })
                }
            })
        })
}

function undoRequest() {
    deleteRequest();
    document.querySelector("#success-container").style.visibility = "hidden";
}

function confirmRequest() {
    localStorage.setItem("hideRequestWarning", document.querySelector("#request-info-hide").checked);
    document.querySelector("#popup-container").style.visibility = "hidden";
    addRequestToFirestore();
}