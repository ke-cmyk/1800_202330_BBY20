authenticateUser(() => {
    displayVehicleInfo();
    let params = new URL( window.location.href );
    let vehicleID = params.searchParams.get( "vehicleID" );
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

function displayVehicleInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let vehicleID = params.searchParams.get( "vehicleID" ); //get value for key "vehicleID"
    console.log( vehicleID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "vehicles" )
        .doc( vehicleID )
        .get()
        .then( doc => {
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
        } );
}

function createRequest() {
    if (localStorage.getItem("hideRequestWarning") != "true") {
        document.querySelector("#popup-container").style.visibility = "visible";

        document.querySelector("#cancel-request").addEventListener("click", () => {
            localStorage.setItem("hideRequestWarning", document.querySelector("#request-info-hide").checked);
            document.querySelector("#popup-container").style.visibility = "hidden";
        })
        document.querySelector("#confirm-request").addEventListener("click", () => {
            localStorage.setItem("hideRequestWarning", document.querySelector("#request-info-hide").checked);
            document.querySelector("#popup-container").style.visibility = "hidden";
            addRequestToFirestore();
        })
    } else {
        addRequestToFirestore();
    }
}

function addRequestToFirestore() {
    db.collection("requests").add({
        requestDate: firebase.firestore.FieldValue.serverTimestamp(),
        requesterID: userID,
        vehicleID: window.location.href.substring(window.location.href.indexOf("=") + 1),
    })
    .then((requestRef) => {
        console.log("Document successfully written!");
        db.collection("users").doc(userID).update({
            requests: firebase.firestore.FieldValue.arrayUnion(requestRef.id)
        })

        document.querySelector("#success-container").style.visibility = "visible";
        document.querySelector("#return-button").addEventListener("click", () => {
            document.querySelector("#success-container").style.visibility = "hidden";
        })
        document.querySelector("#undo-request").addEventListener("click", () => {
            deleteRequest();
            document.querySelector("#success-container").style.visibility = "hidden";
        })

        document.querySelector("#request-button").setAttribute("onclick", "deleteRequest()");
        document.querySelector("#request-button").textContent = "Delete Request";
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function deleteRequest() {
    vehicleID = window.location.href.substring(window.location.href.indexOf("=") + 1);
    requestsCollectionRef = db.collection("requests").where("requesterID", "==", userID).where("vehicleID", "==", vehicleID);

    requestsCollectionRef.get()
    .then(requestRef => {
        requestRef.forEach(doc => {
            if (doc.id != "") {
                db.collection("users").doc(userID).update({
                    requests: firebase.firestore.FieldValue.arrayRemove(doc.id)
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