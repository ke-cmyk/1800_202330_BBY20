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

                document.querySelector("#vehicle-name-display").innerHTML += " - <span class='color-text'>Requested</span>";
            }
        })

    })
    displayCardsDynamically();
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

            document.querySelector("#vehicle-name-display").innerHTML += " - <span class='color-text'>Requested</span>";

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

                        let vehicleText = document.querySelector("#vehicle-name-display").textContent;
                        document.querySelector("#vehicle-name-display").textContent 

                        // 12 is the length of " - <span class=".color-text">Requested</span>
                        = vehicleText.substring(0, vehicleText.length - 12);
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

/* ---------------------------------
            Display Offers
---------------------------------*/

function displayCardsDynamically() {

    let params = new URL(window.location.href); //get URL of search bar
    let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

    let cardTemplate = document.getElementById("vehicle-offers");
    let vehicleOffers = db.collection("offers").where("vehicleID", "==", vehicleID).where("buyerID", "==", userID);
    // console.log(db.collection("offers").where("vehicleID", "==", vehicleID));
    // console.log(vehicleOffers); // temp

    vehicleOffers.get()
        .then(querySnapshot => {
            console.log("query finished", querySnapshot.size);
            querySnapshot.forEach(vehicleOffersDoc => {
                
                console.log("vehicle log", vehicleOffersDoc);

                let sellerID = vehicleOffersDoc.data().sellerID;
                let userDocRef = db.collection("users").doc(sellerID);

                var requestDate = vehicleOffersDoc.data().offerDate;

                // Get the document
                userDocRef.get()
                    .then(userDoc => {
                        if (userDoc.exists) {
                            // Document found, you can access the data using userDoc.data()
                            // console.log("User document data:", userDoc.data());

                            var name = userDoc.data().name;
                            var location = userDoc.data().city;
                            var picture = userDoc.data().profile;
                            var price = vehicleOffersDoc.data().price;

                            let newcard = cardTemplate.content.cloneNode(true);

                            //set custom html attribut of requestID to relevant request for reference by toggle selection
                            let newcardElement = newcard.querySelector('.pill-item');
                            // newcardElement.setAttribute('data-request-id', vehicleRequestsDoc.id);
                            newcardElement.addEventListener('click', function () {
                                        // toggleSelection(this);
                                    });

                            newcard.querySelector('#pill-name').innerHTML = name;
                            newcard.querySelector('#pill-location').innerHTML = location;
                            newcard.querySelector('#pill-price').innerHTML = price;
                            if (price.substring(0, 1) != "$") {
                                newcard.querySelector('#pill-price').innerHTML = "$" + newcard.querySelector('#pill-price').innerHTML;
                            }

                            // const match = requestDate.match(/seconds=(\d+),/);
                            // const seconds = match ? parseInt(match[1], 10) : null;
                            const date = new Date(requestDate.seconds * 1000);
                            const year = date.getFullYear();
                            const month = date.toLocaleString('en-US', { month: 'short' });
                            const day = date.getDate();

                            newcard.querySelector('#pill-date').innerHTML = month + " " + day + ", " + year;
                            // TODO: after user profile pic is implemented, update picture here
                            newcard.querySelector('#pill-pic').setAttribute("src", picture);

                            document.getElementById("offers-container").appendChild(newcard);

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