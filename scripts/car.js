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
function addRequestToFirestore()  {
    vehicleID = window.location.href.substring(window.location.href.indexOf("=") + 1);
    db.collection("requests").add({
        requestDate: firebase.firestore.FieldValue.serverTimestamp(),
        requesterID: userID,
        vehicleID: vehicleID
    })
        .then(async (requestRef) => {
            console.log("Document successfully written!");
            db.collection("users").doc(userID).update({
                requests: firebase.firestore.FieldValue.arrayUnion(requestRef.id),
                vehicles: firebase.firestore.FieldValue.arrayUnion(vehicleID)
            })

            // Success Menu
            // document.querySelector("#success-container").style.visibility = "visible";

            // document.querySelector("#return-button").addEventListener("click", () => {
            //     // document.querySelector("#success-container").style.visibility = "hidden";
            //     window.location.assign("buy.html");
            // })
            document.querySelector("#request-button").setAttribute("onclick", "deleteRequest()");
            document.querySelector("#request-button").textContent = "Delete Request";

            document.getElementById("successRequestPlaceholder").innerHTML = await fetchHtmlAsText("./text/request_success.html");

            // $('#successRequestPlaceholder').load('./text/request_success.html').then(() => {
            //     document.getElementById("success-popup-container").className += "slide-in-bottom";
            // });


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
    document.querySelector("#success-popup").remove();
    // history.back();
}

function confirmRequest() {
    localStorage.setItem("hideRequestWarning", document.querySelector("#request-info-hide").checked);
    document.querySelector("#popup-container").style.visibility = "hidden";
    addRequestToFirestore();
}

function displayTrims() {
    let target = document.getElementById("trim-entries");
    let template = document.getElementById("vehicle-trim");
    let vehicleID = window.location.href.substring(window.location.href.indexOf("=") + 1);

    db.collection("vehicles").doc(vehicleID).get().then((vehicleDoc) => {
        vehicleDoc.data().trim.forEach((trim) => {
            let newTrim = template.content.cloneNode(true);
            newTrim.querySelector(".vehicle-trim-name-display").textContent = trim.name;
            newTrim.querySelector(".vehicle-trim-price-display").textContent = "$" + trim.msrp;
            target.appendChild(newTrim);
        })
    });
}
displayTrims();

let trimsHidden = "true";
document.querySelector("#expand-button").addEventListener("click", () => {
    if (trimsHidden == "true") {
        document.querySelector("#trim-entries").style.display = "inherit";
        document.querySelector("#expand-button").setAttribute("src", "./images/expandLess.svg");
        trimsHidden = "false";
    } else {
        document.querySelector("#trim-entries").style.display = "none";
        document.querySelector("#expand-button").setAttribute("src", "./images/expandMore.svg");
        trimsHidden = "true";
    }
})

let detailsHidden = "false";
document.querySelector("#expand-details-button").addEventListener("click", () => {
    if (detailsHidden == "true") {
        document.querySelector("#details-content").style.display = "block";
        document.querySelector("#expand-details-button").setAttribute("src", "./images/expandLess.svg");
        // document.querySelector("#details-header").style.fontSize = "calc(1.325rem + .9vw)";
        detailsHidden = "false";
    } else {
        document.querySelector("#details-content").style.display = "none";
        document.querySelector("#expand-details-button").setAttribute("src", "./images/expandMore.svg");
        // document.querySelector("#details-header").style.fontSize = "20px";
        detailsHidden = "true";
    }
})

document.querySelector("#trim-entries").addEventListener