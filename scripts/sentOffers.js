authenticateUser(() => {
    console.log(userID);
    displayOffers()

});

async function displayOffers() {
    let cardTemplate = document.getElementById("offers");
    let params = new URL(window.location.href);
    let vehicleID = params.searchParams.get("vehicleID");
    let userCarOffers = await db.collection("offers").where("sellerID", "==", userID).where("vehicleID", "==", vehicleID).get();

    for (let i = 0; i < userCarOffers.docs.length; i++) {
        var newcard = cardTemplate.content.cloneNode(true);

        var vehiclePrice = userCarOffers.docs[i].data().price;
        var vehicleColor = userCarOffers.docs[i].data().color;
        var vehicleOdometer = userCarOffers.docs[i].data().odometer;
        var vehicleVin = userCarOffers.docs[i].data().vin;
        var requesterID = userCarOffers.docs[i].data().buyerID;

        let offerRequester = await db.collection("users").doc(requesterID).get();
        var requesterName = offerRequester.data().name;
        var requesterLocation = offerRequester.data().city;
        var requesterImg = offerRequester.data().profile;

        newcard.querySelector('.requester-name').innerHTML = requesterName;
        newcard.querySelector('.requester-location').innerHTML = requesterLocation;
        newcard.querySelector('.requester-pic').setAttribute('src', requesterImg);

        newcard.querySelector('.vehicle-price').innerHTML = vehiclePrice;
        newcard.querySelector('.vehicle-color').innerHTML = vehicleColor;
        newcard.querySelector('.vehicle-odometer').innerHTML = vehicleOdometer;
        newcard.querySelector('.vehicle-vin').innerHTML = vehicleVin;

        document.getElementById("car-offers-list").appendChild(newcard);
    }
}