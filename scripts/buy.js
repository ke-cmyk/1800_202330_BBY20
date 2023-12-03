authenticateUser(() => {
    console.log(userID);

    if (window.location.href.endsWith("buy.html")) {
        displayCardsDynamically();
        document.getElementById("find-car-btn").addEventListener("mouseup", () => {
            window.location.href = "buySearch.html";
        })
    }
});

function displayCardsDynamically() {
    let cardTemplate = document.getElementById("request-template");
    console.log(cardTemplate);
    let userDocRef = db.collection("users").doc(userID);

    userDocRef.get()
        .then(userDoc => {
            if (userDoc.data().requests.length <= 0) {
                document.getElementById("requests-container").innerHTML =
                    `<p class="glass-container">
        You have not made any requests. When you do, they will show up here.
        </p>`;
            }
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
                if (yearTerm || modelTerm || makeTerm) {
                    document.getElementById("myCars-go-here").innerHTML =
                        `<p class="glass-container">
                We couldn't find any cars with your specifications.
                </p>`;
                }
            }
        })
}

if (window.location.href.includes("buySearch.html")) {
    window.onload = searchCars;
}


// Allows user to activate search by pressing enter
document.addEventListener("keyup", (event) => {
    if (window.location.href.endsWith("buySearch.html") && event.key === "Enter") {
        searchCars();
    }
})

function populateCarCard(doc, cardTemplate, target, requested, requestNumber) {
    var make = doc.data().make;
    var model = doc.data().model;
    var year = doc.data().year;
    var vehicleID = doc.id;
    let newcard = cardTemplate.content.cloneNode(true);


    console.log(doc.data().model, requested)
    if (requested) {
        newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model + ' - <span class="color-text">Requested</span>';
        if (requestNumber == 1) {
            newcard.querySelector('.car-details-prompt').textContent = requestNumber + " Offer Recieved >";
        } else {
            newcard.querySelector('.car-details-prompt').textContent = requestNumber + " Offers Recieved >";
        }
        newcard.querySelector('.car-preview-name').style.backgroundColor = "white";

    } else {
        newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model;
        newcard.querySelector('.car-details-prompt').textContent = "Request this car >";
    }

    newcard.querySelector('.car-preview-msrp').textContent = "$" + doc.data().trim[0].msrp;
    newcard.querySelector('.request-card').style.setProperty("background", `url(${doc.data().img[1]})`);
    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");
    newcard.querySelector('a').href = 'car.html?vehicleID=' + vehicleID;
    target.appendChild(newcard);
}