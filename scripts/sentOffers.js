/* Loaded on:
 * car.html
 * sentOffers.html
 */

authenticateUser(() => {
    console.log(userID);
    if (window.location.href.includes("sentOffers.html")) {
        displayOffers();
    }
});

/**
 * Displays the offers the current user has made for a particular car.
 */
async function displayOffers() {

    let cardTemplate = document.getElementById("offers");
    let params = new URL(window.location.href);
    let vehicleID = params.searchParams.get("vehicleID");
    let userCarOffers = await db.collection("offers").where("sellerID", "==", userID).where("vehicleID", "==", vehicleID).get();

    for (let i = 0; i < userCarOffers.docs.length; i++) {
        var newcard = cardTemplate.content.cloneNode(true);
        newcard.querySelector('.offer-card').setAttribute("data-request-id", userCarOffers.docs[i].id);

        // Grab data about the offer
        let requesterPrice = userCarOffers.docs[i].data().requesterPrice;
        let vehiclePrice = userCarOffers.docs[i].data().price;
        let vehicleColor = userCarOffers.docs[i].data().color;
        let vehicleOdometer = userCarOffers.docs[i].data().odometer;
        let vehicleVin = userCarOffers.docs[i].data().vin;
        let requesterID = userCarOffers.docs[i].data().buyerID;

        let offerDate = userCarOffers.docs[i].data().offerDate.toDate().toDateString();

        let offerRequester = await db.collection("users").doc(requesterID).get();
        let requesterName = offerRequester.data().name;
        let requesterLocation = offerRequester.data().city;
        let requesterImg = offerRequester.data().profile;

        newcard.querySelector('.requester-name').innerHTML = requesterName;
        if (requesterLocation) {
            newcard.querySelector('.requester-location').innerHTML = requesterLocation;
        }
        newcard.querySelector('.requester-pic').setAttribute('src', requesterImg);
        newcard.querySelector('.offer-date').innerHTML += offerDate;

        newcard.querySelector('.vehicle-price-requester').innerHTML += "$" + requesterPrice;

        // If it exists, display the field
        if (vehiclePrice.substring(0, 1) == "$") {
            newcard.querySelector('.vehicle-price').innerHTML += vehiclePrice;
        } else {
            newcard.querySelector('.vehicle-price').innerHTML += "$" + vehiclePrice;
        }
        if (vehicleColor) {
            newcard.querySelector('.vehicle-color').innerHTML += vehicleColor;
        } else {
            newcard.querySelector('.vehicle-color').innerHTML = "";
        }
        if (vehicleOdometer) {
            newcard.querySelector('.vehicle-odometer').innerHTML += vehicleOdometer + " miles";
        } else {
            newcard.querySelector('.vehicle-odometer').innerHTML = "";
        }
        if (vehicleVin) {
            newcard.querySelector('.vehicle-vin').innerHTML += vehicleVin;
        } else {
            newcard.querySelector('.vehicle-vin').innerHTML += "None";
        }

        newcard.querySelector('.delete-offer-button').setAttribute("onclick", `deleteOffer("${userCarOffers.docs[i].id}")`);

        document.getElementById("car-offers-list").appendChild(newcard);
    }
}

/**
 * Deletes an offer entirely. This function deletes:
 * - The offer from the 'offers' collection
 * - The offerID from the 'offers' array of the seller
 * - The vehicleID from the 'offerVehiclesIDs' array of the seller IF there are no other offers with the sellerID of the seller AND the vehicleID of the current vehicleID.
 * @param {string} offerID 
 */
async function deleteOffer(offerID) {
    let offerDoc = await db.collection("offers").doc(offerID).get();
    db.collection("users").doc(offerDoc.data().sellerID).update({
        offers: firebase.firestore.FieldValue.arrayRemove(offerID)
    })
    db.collection("offers").doc(offerID).delete();

    db.collection("users").doc(offerDoc.data().sellerID).get().then(userDoc => {

        userDoc.data().offerVehicleIDs.forEach(vehicleID => {
            db.collection("offers").where("sellerID", "==", offerDoc.data().sellerID).where("vehicleID", "==", vehicleID).get().then(remainingOffers => {
                console.log(vehicleID, remainingOffers.docs.length);

                if (remainingOffers.docs.length == 0) {
                    db.collection("users").doc(offerDoc.data().sellerID).update({
                        offerVehicleIDs: firebase.firestore.FieldValue.arrayRemove(vehicleID)
                    })
                }
            })
        })
    })

    if (window.location.href.includes("sentOffers.html")) {
        deleteOfferDisplay(offerID);
    }
}

/**
 * Deletes the offer DOM Element.
 */
function deleteOfferDisplay(offerID) {
    document.querySelector(`div[data-request-id="${offerID}"]`).remove();
}