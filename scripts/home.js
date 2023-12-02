authenticateUser(() => {
    loadRecommendations();
});

/**
 * loads the data for recommendations on the home page. populateCarCard is borrowed from buy.js.
 */
function loadRecommendations() {
    let cardTemplate = document.getElementById("car-card");
    let target = document.getElementById("recommendations");

    let vehicleArray;

    db.collection("users").doc(userID).get().then(userDoc => {
        if (userDoc.data().vehicles.length == 0) {
            vehicleArray = ["-1"];
        } else {
            vehicleArray = userDoc.data().vehicles;
        }
        db.collection("vehicles").where(firebase.firestore.FieldPath.documentId(), "not-in", vehicleArray).get().then(vehiclesDoc => {

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