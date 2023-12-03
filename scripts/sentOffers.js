authenticateUser(() => {
    console.log(userID);
    displayOffers();

});

async function displayOffers() {

    let cardTemplate = document.getElementById("offers");
    let params = new URL(window.location.href);
    let vehicleID = params.searchParams.get("vehicleID");
    let userCarOffers = await db.collection("offers").where("sellerID", "==", userID).where("vehicleID", "==", vehicleID).get();

    for (let i = 0; i < userCarOffers.docs.length; i++) {
        var newcard = cardTemplate.content.cloneNode(true);
        newcard.querySelector('.offer-card').setAttribute("data-request-id", userCarOffers.docs[i].id);

        var vehiclePrice = userCarOffers.docs[i].data().price;
        var vehicleColor = userCarOffers.docs[i].data().color;
        var vehicleOdometer = userCarOffers.docs[i].data().odometer;
        var vehicleVin = userCarOffers.docs[i].data().vin;
        var requesterID = userCarOffers.docs[i].data().buyerID;

        let offerDate = userCarOffers.docs[i].data().offerDate.toDate().toDateString();

        let offerRequester = await db.collection("users").doc(requesterID).get();
        var requesterName = offerRequester.data().name;
        var requesterLocation = offerRequester.data().city;
        var requesterImg = offerRequester.data().profile;

        newcard.querySelector('.requester-name').innerHTML = requesterName;
        if (requesterLocation) {
            newcard.querySelector('.requester-location').innerHTML = requesterLocation;
        }
        newcard.querySelector('.requester-pic').setAttribute('src', requesterImg);
        newcard.querySelector('.offer-date').innerHTML += offerDate;

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
 * - The offerID from the 'offers' array of the current user
 * - The vehicleID from the 'offerVehiclesIDs' array of the current user IF there are no other offers with the sellerID of the current user AND the vehicleID of the current vehicleID.
 * @param {*} offerID 
 */
function deleteOffer(offerID) {
    db.collection("users").doc(userID).update({
        offers: firebase.firestore.FieldValue.arrayRemove(offerID)
    })
    db.collection("offers").doc(offerID).delete().then(() => {
        console.log("offer deleted");

        db.collection("users").doc(userID).get().then(userDoc => {

            userDoc.data().offerVehicleIDs.forEach(vehicleID => {
                db.collection("offers").where("sellerID", "==", userID).where("vehicleID", "==", vehicleID).get().then(remainingOffers => {
                    console.log(vehicleID, remainingOffers.docs.length);

                    if (remainingOffers.docs.length == 0) {
                        db.collection("users").doc(userID).update({
                            offerVehicleIDs: firebase.firestore.FieldValue.arrayRemove(vehicleID)
                        })
                    }
                })
            })
        });
    })

    deleteOfferDisplay(offerID);
}

function deleteOfferDisplay(offerID) {
    document.querySelector(`div[data-request-id="${offerID}"]`).remove();
}