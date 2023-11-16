authenticateUser(() => {
    displayVehicleInfo();
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

            // populate name
            document.getElementById("vehicle-year-display").innerHTML = vehicleYear;
            document.getElementById("vehicle-make-display").innerHTML = vehicleMake;
            document.getElementById("vehicle-model-display").innerHTML = vehicleModel;

            // populate fuel & type
            document.getElementById("vehicle-type-display").innerHTML = vehicleType;
            document.getElementById("vehicle-fuel-display").innerHTML = vehicleFuel;

            // uncomment when image stuff is sorted
            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        } );
}

function createRequest() {
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
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}