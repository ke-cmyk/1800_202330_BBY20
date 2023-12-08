/* Loaded on:
 * carSell.html
 */

authenticateUser(() => {
    displayCardsDynamically();
})

displayVehicleInfo();

/**
 * Displays a vehicle's details in the context of a seller's viewpoint.
 */
function displayVehicleInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

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

/**
 * Displays the requests for a car so that a seller can choose them.
 */
function displayCardsDynamically() {
    let params = new URL(window.location.href); //get URL of search bar
    let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

    let cardTemplate = document.getElementById("requests");
    let vehicleRequests = db.collection("requests").where("vehicleID", "==", vehicleID).where("requesterID", "!=", userID);

    vehicleRequests.get()
        .then(querySnapshot => {
            querySnapshot.forEach(vehicleRequestsDoc => {

                let requesterID = vehicleRequestsDoc.data().requesterID;
                let userDocRef = db.collection("users").doc(requesterID);

                var requestDate = vehicleRequestsDoc.data().requestDate;

                // Get the document
                userDocRef.get()
                    .then(userDoc => {
                        if (userDoc.exists) {

                            var name = userDoc.data().name;
                            var location = userDoc.data().city;
                            var picture = userDoc.data().profile;

                            let newcard = cardTemplate.content.cloneNode(true);

                            //set custom html attribute of requestID to relevant request for reference by toggle selection
                            let newcardElement = newcard.querySelector('.pill-item');
                            newcardElement.setAttribute('data-request-id', vehicleRequestsDoc.id);
                            newcardElement.addEventListener('click', function () {
                                        toggleSelection(this);
                                        buttonStatus();
                                    });

                            newcard.querySelector('#pill-name').innerHTML = name;
                            newcard.querySelector('#pill-location').innerHTML += "$" + vehicleRequestsDoc.data().requesterPrice;
                            if (location) {
                                newcard.querySelector('#pill-location').innerHTML += `,  ` + location;
                            }

                            // Get time information of request postings
                            const date = new Date(requestDate.seconds * 1000);
                            const year = date.getFullYear();
                            const month = date.toLocaleString('en-US', { month: 'short' });
                            const day = date.getDate();

                            newcard.querySelector('#pill-date').innerHTML = month + " " + day + "<br>" + year;
                            newcard.querySelector('#pill-pic').setAttribute('src', picture);

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

// Local variable to store selected items
var selectedItems = [];

// JavaScript function to toggle the 'selected' class and update local variable
function toggleSelection(element) {
    element.classList.toggle('selected');

    // Get the unique identifier for the item (data-id attribute)
    const requestId = element.getAttribute('data-request-id');

    // Toggle the item in the array
    const index = selectedItems.indexOf(requestId);
    if (index !== -1) {
        selectedItems.splice(index, 1); // Remove if already selected
    } else {
        selectedItems.push(requestId); // Add if not selected
    }
    // console.log(selectedItems);


}

/**
 * Updates send-offer-button based on selections made.
 */
function buttonStatus() {
    //If requests selected, makes button clickable and solid color.
    if (selectedItems.length > 0) {
        document.getElementById("send-offer-button").classList.add('selectionMade');
    } else {
        document.getElementById("send-offer-button").classList.remove('selectionMade');
    }

    //Updates number of items selected in button name.
    document.getElementById("send-offer-button").innerHTML = "Send Offers (" + selectedItems.length + ")";
}

document.getElementById("send-offer-button").addEventListener("click", function() {

    if (selectedItems.length != 0) {
        localStorage.setItem('selectedRequests', JSON.stringify(selectedItems));
        let params = new URL(window.location.href); //get URL of search bar
        let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"
        window.location.href = 'offerForm.html?vehicleID=' + vehicleID;
    } else {
        console.log("no new requests");
    }
})