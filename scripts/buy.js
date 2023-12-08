/* Loaded on:
 * buy.html
 * buySearch.html
 * home.html
 */

authenticateUser(() => {
    console.log(userID);

    if (window.location.href.endsWith("buy.html")) {
        displayCardsDynamically();
        document.getElementById("find-car-btn").addEventListener("mouseup", () => {
            window.location.href = "buySearch.html";
        })
    }
});

/**
 * Displays a users requests on buy.html.
 * Multiple database reads must be done to obtain a count of the offers a particular request has recieved.
 */
function displayCardsDynamically() {
    let cardTemplate = document.getElementById("request-template");
    let userDocRef = db.collection("users").doc(userID);

    // Retrieve a user's requests.
    userDocRef.get()
        .then(userDoc => {
            // If there are no requests, display a message
            if (userDoc.data().requests.length <= 0) {
                document.getElementById("requests-container").innerHTML =
                    `<p class="glass-container">
        You have not made any requests. When you do, they will show up here.
        </p>`;
            }
            // For each request, get the number of offers that have this request id and display it
            userDoc.data().requests.forEach(requestId => {
                if (requestId != "") {
                    db.collection("requests").doc(requestId).get().then(requestDoc => {
                        db.collection("vehicles").doc(requestDoc.data().vehicleID).get().then(doc => {
                            let numberOfOffers;
                            db.collection("offers").where("requestID", "==", requestId).get().then((offerDocs) => {
                                numberOfOffers = offerDocs.size;
                                populateCarCard(doc, cardTemplate, document.getElementById("requests-container"), true, numberOfOffers);
                            })
                        })
                    })
                }
            })
        })
}

function searchCars() {
    let cardTemplate = document.getElementById("search-results");
    let makeTerm = toTitleCase(document.querySelector("#search-make").value);
    let modelTerm = toTitleCase(document.querySelector("#search-model").value);
    let yearTerm = document.querySelector("#search-year").value;

    console.log(makeTerm, modelTerm, yearTerm);
    var carsCollectionRef = db.collection("vehicles");

    //create conditional queries based off of whether or not make, model and yearTerm are empty.
    if (makeTerm) {
        carsCollectionRef = carsCollectionRef.where("make", "==", makeTerm);
    }
    if (modelTerm) {
        carsCollectionRef = carsCollectionRef.where("model", "==", modelTerm);
    }
    if (yearTerm) {
        carsCollectionRef = carsCollectionRef.where("year", "==", parseInt(yearTerm));
    }
    if (!makeTerm && !modelTerm && !yearTerm) {
        carsCollectionRef = carsCollectionRef.where("year", "==", -1);
    }

    carsCollectionRef.get()
        .then(allmycars => {
            document.getElementById("myCars-go-here").innerHTML = ``;
            if (allmycars.size > 0) {
                db.collection("users").doc(userID).get().then(userDoc => {
                    allmycars.forEach(car => {

                        // Gets the number of offers that the request currently has.
                        let carIndex = userDoc.data().vehicles.indexOf(car.id);
                        let currentRequestID;
                        if (carIndex != -1) {
                            currentRequestID = userDoc.data().requests[carIndex];
                        } else {
                            currentRequestID = "";
                        }

                        // retrieve the offers for this request and count them
                        db.collection("offers").where("requestID", "==", currentRequestID).get().then((offerDocs) => {
                            if (userDoc.data().vehicles != null) {
                                isRequested = userDoc.data().vehicles.includes(car.id);
                            } else {
                                isRequested = false;
                            }
                            console.log(car.data().model, isRequested);
                            populateCarCard(car, cardTemplate, document.getElementById("myCars-go-here"), isRequested, offerDocs.size);
                        })
                    })
                })
            } else {
                console.log(yearTerm, modelTerm, makeTerm);
                // if the user has searched something, display a message. Otherwise, this is the first time the user has loaded
                // the search page and no message should be displayed.
                if (yearTerm || modelTerm || makeTerm) {
                    document.getElementById("myCars-go-here").innerHTML =
                        `<p class="glass-container">
                We couldn't find any cars with your specifications.
                </p>`;
                }
            }
        })
}

// Reloads search results once the page has loaded
if (window.location.href.includes("buySearch.html")) {
    window.onload = searchCars;
}

// Allows user to activate search by pressing enter
document.addEventListener("keyup", (event) => {
    if (window.location.href.endsWith("buySearch.html") && event.key === "Enter") {
        searchCars();
    }
})

/**
 * Handles the creation of a car card in multiple locations, home, buy, and buy search.
 * This function displays a car's information in the card, and decides on the formatting of the element
 * which depends on if it is requested or not.
 * 
 * @param {Object} doc the pointer to the Firebase document that has a car's information
 * @param {Element} cardTemplate the DOM Element that is populated with info
 * @param {Element} target the DOM Element that the document's info is dumped into
 * @param {boolean} requested has the car been requested?
 * @param {number} requestNumber the number of requests that a car-user combo has recieved
 */
function populateCarCard(doc, cardTemplate, target, requested, requestNumber) {
    var make = doc.data().make;
    var model = doc.data().model;
    var year = doc.data().year;
    var vehicleID = doc.id;
    let newcard = cardTemplate.content.cloneNode(true);

    // if the car is requested by the current user, change the formatting
    if (requested) {
        newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model + ' - <span class="color-text">Requested</span>';
        if (requestNumber == 1) {
            newcard.querySelector('.car-details-prompt').textContent = requestNumber + " Offer Recieved >";
        } else {
            newcard.querySelector('.car-details-prompt').textContent = requestNumber + " Offers Recieved >";
        }
        newcard.querySelector('.car-preview-name').style.backgroundColor = "white";
        newcard.querySelector('.car-preview-msrp').textContent = "";
    } else {
        newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model;
        newcard.querySelector('.car-preview-msrp').textContent = "New: $" + doc.data().trim[0].msrp;
        newcard.querySelector('.car-details-prompt').textContent = "Request this car >";
    }

    // Insert the car image
    newcard.querySelector('.request-card').style.setProperty("background", `url(${doc.data().img[1]})`);
    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");
    newcard.querySelector('a').href = 'car.html?vehicleID=' + vehicleID;
    target.appendChild(newcard);
}