/* Loaded on:
 * sell.html
 * carSell.html
 * sellSearch.html
 */

authenticateUser(() => {
    console.log(userID);

    if (window.location.href.endsWith("sell.html")) {
        displayCardsDynamically();
        document.getElementById("find-car-btn").addEventListener("click", () => {
            window.location.href = "sellSearch.html";
        })
    }
});

/**
 * Shows requests with offer numbers on the sell page.
 */
async function displayCardsDynamically() {

    let cardTemplate = document.getElementById("offered-car-template");
    let userDoc = await db.collection("users").doc(userID).get();

    let offerVehicleIDs = userDoc.data().offerVehicleIDs;

    if (offerVehicleIDs.length <= 0) {
        document.getElementById("offered-cars-container").innerHTML =
                        `<p class="glass-container">
                You have not made any offers. When you do, they will show up here.
                </p>`;
    }

    offerVehicleIDs.forEach(vehicleID => {

        let vehicleDoc = db.collection("vehicles").doc(vehicleID);

        vehicleDoc.get()
            .then(vehicleDoc => {
                if (vehicleDoc.exists) {
                    // Document found, you can access the data using userDoc.data()
                    // console.log("User document data:", userDoc.data());
                    var vehicleYear = vehicleDoc.data().year;
                    var vehicleMake = vehicleDoc.data().make;
                    var vehicleModel = vehicleDoc.data().model;
                    var vehicleImage2 = vehicleDoc.data().img[1];

                    let newcard = cardTemplate.content.cloneNode(true);

                    //set custom html attribut of requestID to relevant request for reference by toggle selection
                    let newcardElement = newcard.querySelector('.request-card');

                    newcardElement.addEventListener('click', function () {
                        window.location.href = 'sentOffers.html?vehicleID=' + vehicleID;
                    });

                    newcard.querySelector('.offered-car-name').innerHTML = vehicleYear + " " + vehicleMake + " " + vehicleModel;
                    newcard.querySelector('.request-card').style.setProperty("background", `url(${vehicleDoc.data().img[1]})`);
                    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
                    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");

                    db.collection("offers").where("sellerID", "==", userID).where("vehicleID", "==", vehicleID).get().then((offerDocs) => {
                        let offerCount = 0;
                        offerDocs.forEach(offerDoc => {
                            offerCount++;
                        })
                        newcard.querySelector('.car-details-prompt').textContent = `${offerCount} sent`;
                        if (offerCount == 1) {
                            newcard.querySelector('.car-details-prompt').textContent += " offer >";
                        } else {
                            newcard.querySelector('.car-details-prompt').textContent += " offers >";
                        }
                        document.getElementById("offered-cars-container").appendChild(newcard);
                    })

                } else {
                    console.log("User not found");
                }
            })
    })
}

/**
 * Searches the db for cars that match user input in the search bar and displays requests on the sell search page.
 */
function searchCars() {
    let cardTemplate = document.getElementById("search-results");
    let makeTerm = toTitleCase(document.querySelector("#search-make").value);
    let modelTerm = toTitleCase(document.querySelector("#search-model").value);
    let yearTerm = document.querySelector("#search-year").value;

    console.log(makeTerm, modelTerm, yearTerm);
    var carsCollectionRef = db.collection("vehicles");

    //create conditional queries based off of whether or not make, model and yearSearchTerm are empty.
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
        .then(offers => {
            document.getElementById("myCars-go-here").innerHTML = ``;
            if (offers.size > 0) {
                db.collection("users").doc(userID).get().then(userDoc => {
                    offers.forEach(car => {
                        let numberOfRequests;

                        //queries db for requests only with the selected vehicle and not by the signed-in user
                        db.collection("requests").where("vehicleID", "==", car.id).where("requesterID", "!=", userDoc.id).get().then((requestDocs) => {
                            numberOfRequests = requestDocs.size;

                            //double check that no request lists with 0 requests are rendered
                            if (numberOfRequests > 0) {
                                populateCarCard(car, cardTemplate, document.getElementById("myCars-go-here"), numberOfRequests);
                            }

                        })
                    })
                })
            } else {
                if (yearTerm || modelTerm || makeTerm) {
                    document.getElementById("myCars-go-here").innerHTML =
                        `<p class="glass-container">
                We couldn't find any cars with your specifications.
                </p>`;
                }
            }
        })
}

//searches upon load of search page
if (window.location.href.includes("sellSearch.html")) {
    window.onload = searchCars;
}

// Allows user to activate search by pressing enter
document.addEventListener("keyup", (event) => {
    if (window.location.href.endsWith("sellSearch.html") && event.key === "Enter") {
        searchCars();
    }
})

/**
 * Populates a car card and appends it in search results based on Firestore data.
 * 
 * @param {object} doc the Firestore doc that data is taken from
 * @param {object} cardTemplate the DOM template that is populated with doc data
 * @param {object} target the DOM element where the cardTemplate children are added into
 * @param {number} numberOfRequests the number of requests that are for the car represented by doc
 */
function populateCarCard(doc, cardTemplate, target, numberOfRequests) {
    var make = doc.data().make;
    var model = doc.data().model;
    var year = doc.data().year;
    var vehicleID = doc.id;
    let newcard = cardTemplate.content.cloneNode(true);
    newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model;
    if (numberOfRequests == 1) {
        newcard.querySelector('.car-details-prompt').textContent = numberOfRequests + " Request >";
    } else {
        newcard.querySelector('.car-details-prompt').textContent = numberOfRequests + " Requests >";
    }

    newcard.querySelector('.car-preview-msrp').textContent = "New: $" + doc.data().trim[0].msrp;
    newcard.querySelector('.request-card').style.setProperty("background", `url(${doc.data().img[1]})`);
    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");
    newcard.querySelector('a').href = 'carSell.html?vehicleID=' + vehicleID;
    target.appendChild(newcard);
}