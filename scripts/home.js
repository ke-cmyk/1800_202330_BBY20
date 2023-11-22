authenticateUser(() => {
    loadRecommendations();
});

/**
 * loads the data for recommendations on the home page. populateCarCard is borrowed from buy.js.
 */
function loadRecommendations() {
    let cardTemplate = document.getElementById("car-card");
    let target = document.getElementById("recommendations");

    db.collection("users").doc(userID).get().then(userDoc => {
        db.collection("vehicles").get().then(vehiclesDoc => {
            vehiclesDoc.forEach(vehicle => {
                if (userDoc.data().vehicles != null) {
                    isRequested = userDoc.data().vehicles.includes(vehicle.id);
                } else {
                    isRequested = false;
                }
                populateCarCard(vehicle, cardTemplate, target, isRequested);
            })
        })
    })
}