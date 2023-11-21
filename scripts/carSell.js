authenticateUser(() => {
    displayCardsDynamically();
})

displayVehicleInfo()

function displayVehicleInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let vehicleID = params.searchParams.get( "vehicleID" ); //get value for key "vehicleID"

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "vehicles" )
        .doc( vehicleID )
        .get()
        .then( doc => {
            thisVehicle = doc.data();
            vehicleYear = thisVehicle.year;
            vehicleMake = thisVehicle.make;
            vehicleModel = thisVehicle.model;
            vehicleImage2 = thisVehicle.img[1];

            // Insert image
            document.getElementById("vehicle-image-preview").setAttribute("src", vehicleImage2);

            // populate name
            document.getElementById("vehicle-name-display").textContent = `${vehicleYear} ${vehicleMake} ${vehicleModel}`;

            // uncomment when image stuff is sorted
            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        } );
}

function displayCardsDynamically() {

    let params = new URL(window.location.href); //get URL of search bar
    let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

    let cardTemplate = document.getElementById("requests");
    // console.log(cardTemplate);
    // let userDocRef = db.collection("users").doc(userID);

    // carsCollectionRef = carsCollectionRef.where("make", "==", makeTerm);

    let vehicleRequests = db.collection("requests").where("vehicleID", "==", vehicleID);

    vehicleRequests.get()
        .then(querySnapshot => {
            querySnapshot.forEach(vehicleRequestsDoc => {

                let requesterID = vehicleRequestsDoc.data().requesterID;

                let userDocRef = db.collection("users").doc(requesterID);

                // Get the document
                userDocRef.get()
                    .then(userDoc => {
                        if (userDoc.exists) {
                            // Document found, you can access the data using userDoc.data()
                            // console.log("User document data:", userDoc.data());

                            var name = userDoc.data().name;
                            var location = userDoc.data().city;
                            var picture = userDoc.data().picture;

                            let newcard = cardTemplate.content.cloneNode(true);

                            // newcard.querySelector('.request-car-name p').innerHTML = year + " " + make + " " + model;
                            newcard.querySelector('#requester-name').innerHTML = name;
                            newcard.querySelector('#requester-location').innerHTML = location;

                            document.getElementById("list-of-requests").appendChild(newcard);

                        } else {
                            console.log("User not found");
                        }
                    })

            });
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
        });

}