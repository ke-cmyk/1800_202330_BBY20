authenticateUser(() => {
    // displayCardsDynamically();
})

displayVehicleInfo()

let params = new URL(window.location.href); //get URL of search bar
let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

function displayVehicleInfo() {
 

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
var selectedRequests = localStorage.getItem("selectedRequests");

// Check if the data exists before using it
if (selectedRequests) {
    console.log("Selected Requests:", selectedRequests);
} else {
    console.log("No data found in local storage.");
}

function submitForm() {

    var price = document.getElementById("price-input").value;
    var year = document.getElementById("year-input").value;
    var color = document.getElementById("color-input").value;
    var odometer = document.getElementById("odometer-input").value;
    var vin = document.getElementById("vin-input").value;

    for (var i = 0; i < selectedRequests.length(); i++) {
        db.collection("requests").doc(selectedRequests[i]).collection("offers").add({
            requestID : selectedRequests[i],
            buyerID: db.collection("requests").doc(selectedRequests[i]).data().requesterID,
            sellerID : userID,
            vehicleID: vehicleID,
            offerDate: firebase.firestore.FieldValue.serverTimestamp(),
            price: price,
            year: year,
            color: color,
            odometer:odometer,
            vin: vin
        })
    }
}