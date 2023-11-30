authenticateUser(() => {
    console.log(userID);

    if (window.location.href.endsWith("sell.html")) {
        displayCardsDynamically();
        document.getElementById("find-car-btn").addEventListener("click", () => {
            window.location.href = "sellSearch.html";
        })
    }
});

// Shows car w/ offers on sell page
async function displayCardsDynamically() {

    let cardTemplate = document.getElementById("offered-car-template");
    let userDoc = await db.collection("users").doc(userID).get();

    console.log("this users ID doc", userDoc);

    let offerVehicleIDs = userDoc.data().offerVehicleIDs;

    //I am getting the list properly from database
    console.log("offer vehicles", offerVehicleIDs);

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

                    // for adding image to html <img>
                    // let newcardImg = newcardElement.querySelector('.offered-car-image');
                    // newcardImg.setAttribute('src', vehicleImage2);

                    newcard.querySelector('.offered-car-name').innerHTML = vehicleYear + " " + vehicleMake + " " + vehicleModel;

                    // newcard.querySelector('#offer-location-display').innerHTML = location;
                    // newcard.querySelector('#offer-price-display').innerHTML = price;


                    // const match = requestDate.match(/seconds=(\d+),/);
                    // const seconds = match ? parseInt(match[1], 10) : null;
                    // const date = new Date(requestDate.seconds * 1000);
                    // const year = date.getFullYear();
                    // const month = date.toLocaleString('en-US', { month: 'short' });
                    // const day = date.getDate();

                    // TODO: after user profile pic is implemented, update picture here

                    newcard.querySelector('.request-card').style.setProperty("background", `url(${vehicleDoc.data().img[1]})`);
                    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
                    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");

                    document.getElementById("offered-cars-container").appendChild(newcard);

                } else {
                    console.log("User not found");
                }
            })










    })





    // let userOffers = db.collection("requests").where("sellerID", "==", userID);

    // let carsBeingOffered = new Set();

    // userOffers.get()
    //     .then(offerDoc => {
    //         offerDoc.forEach(vehicleOfferDoc => {
    //             var vehicleID = vehicleOfferDoc.vehicleID;
    //             carsBeingOffered.add(vehicleID);
    //         })
    //     })

    // console.log(carsBeingOffered);
    //------------

    // .doc(userID);

    // userDocRef.get()
    // .then(userDoc => {
    //     userDoc.data().requests.forEach(requestId => {
    //         if (requestId != "") {
    //             db.collection("requests").doc(requestId).get()
    //             .then(requestDoc => {
    //                 db.collection("vehicles").doc(requestDoc.data().vehicleID).get()
    //                 .then(doc => {
    //                     populateCarCard(doc, cardTemplate, document.getElementById("requests-container"), true);
    //                 })
    //             })
    //         }
    //     })
    // })
}

function searchCars() {
    let cardTemplate = document.getElementById("search-results");
    let makeTerm = toTitleCase(document.querySelector("#search-make").value);
    let modelTerm = toTitleCase(document.querySelector("#search-model").value);
    let yearTerm = document.querySelector("#search-year").value;

    console.log(makeTerm, modelTerm, yearTerm);
    var carsCollectionRef = db.collection("vehicles");

    //create conditional queries5 based off of whether or not make, model and yearSearchTerm are empty.
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
                        let numberOfRequests;
                        db.collection("requests").where("vehicleID", "==", car.id).where("requesterID", "!=", userID).get().then((requestDocs) => {
                            numberOfRequests = requestDocs.size;
                            populateCarCard(car, cardTemplate, document.getElementById("myCars-go-here"), numberOfRequests);
                        })
                    })
                })
            } else {
                document.getElementById("myCars-go-here").innerHTML =
                    `<p class="glass-container">
            We couldn't find any cars with your specifications.
            </p>`;
            }
        })
}

// Allows user to activate search by pressing enter
document.addEventListener("keyup", (event) => {
    if (window.location.href.endsWith("buySearch.html") && event.key === "Enter") {
        searchCars();
    }
})

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

    newcard.querySelector('.car-preview-msrp').textContent = "$" + doc.data().trim[0].msrp;
    newcard.querySelector('.request-card').style.setProperty("background", `url(${doc.data().img[1]})`);
    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");
    newcard.querySelector('a').href = 'carSell.html?vehicleID=' + vehicleID;
    target.appendChild(newcard);
}