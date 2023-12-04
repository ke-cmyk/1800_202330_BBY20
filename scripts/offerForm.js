authenticateUser(() => {
    displayVehicleInfo()
})

function displayVehicleInfo() {

    let params = new URL(window.location.href); //get URL of search bar
    var vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

    if (!vehicleID) {
        console.error("Error: Vehicle ID is null or undefined.");
        return;
    }

    db.collection("vehicles")
        .doc(vehicleID)
        .get()
        .then(doc => {
            thisVehicle = doc.data();
            vehicleYear = thisVehicle.year;
            vehicleMake = thisVehicle.make;
            vehicleModel = thisVehicle.model;
            vehicleImage2 = thisVehicle.img[1];

            // Insert image
            document.getElementById("vehicle-image-preview").setAttribute("src", vehicleImage2);

            // populate name
            document.getElementById("vehicle-name-display").textContent = `${vehicleYear} ${vehicleMake} ${vehicleModel}`;
        });
}

// Retrieving data from local storage on the second page
const selectedRequests = JSON.parse(localStorage.getItem("selectedRequests"));

// Check if the data exists before using it
if (selectedRequests) {
    console.log("Selected Requests:", selectedRequests);
} else {
    console.log("No data found in local storage.");
}

async function submitForm() {
    let params = new URL(window.location.href);
    var vehicleID = params.searchParams.get("vehicleID");

    if (!vehicleID) {
        console.error("Error: Vehicle ID is null or undefined.");
        return;
    }

    var price = document.getElementById("price-input").value;
    var year = document.getElementById("year-input").value;
    var color = document.getElementById("color-input").value;
    var odometer = document.getElementById("odometer-input").value;
    var vin = document.getElementById("vin-input").value;

    for (var i = 0; i < selectedRequests.length; i++) {
        var requestDoc = db.collection("requests").doc(selectedRequests[i]);

        try {
            const doc = await requestDoc.get();

            console.log("does doc exis", doc.exists);

            if (doc.exists) {
                var buyerID = doc.data().requesterID;
                console.log("Buyer ID:", buyerID);

                const offerRef = await db.collection("offers").add({
                    requestID: selectedRequests[i],
                    buyerID: buyerID,
                    sellerID: userID,
                    vehicleID: vehicleID,
                    offerDate: firebase.firestore.FieldValue.serverTimestamp(),
                    price: price,
                    year: year,
                    color: color,
                    odometer: odometer,
                    vin: vin
                });

                const offerID = offerRef.id;

                // Update user info with the offerID
                await db.collection("users").doc(userID).update({
                    offers: firebase.firestore.FieldValue.arrayUnion(offerID),
                    offerVehicleIDs: firebase.firestore.FieldValue.arrayUnion(vehicleID)
                });

            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    }
}

document.getElementById("offer-form-submit").addEventListener("click", function (event) {
    event.preventDefault();
    submitForm().then(async function() {
        document.getElementById("offer-form-submit").style.visibility = "hidden";
        document.getElementById("successOfferPlaceholder").innerHTML = await fetchHtmlAsText("./text/offer_success.html");
        setTimeout(function() {
            window.location.href = "sell.html";
        }, 3000); // 3000 milliseconds = 3 seconds
    });
})