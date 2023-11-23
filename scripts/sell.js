authenticateUser(() => {
    console.log(userID);

    if (window.location.href.endsWith("sell.html")) {
        // displayCardsDynamically();
        document.getElementById("find-car-btn").addEventListener("click", () => {
            window.location.href = "sellSearch.html";
        })
    }
});

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
                    if (userDoc.data().vehicles != null) {
                        isRequested = userDoc.data().vehicles.includes(car.id);
                    } else {
                        isRequested = false;
                    }
                    populateCarCard(car, cardTemplate, document.getElementById("myCars-go-here"), isRequested);
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

function populateCarCard(doc, cardTemplate, target, requested) {
    var make = doc.data().make;
    var model = doc.data().model;
    var year = doc.data().year;
    var vehicleID = doc.id;
    let newcard = cardTemplate.content.cloneNode(true);
    if (requested) {
        newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model; // + ' - <span class="color-text">Requested</span>';
        // newcard.querySelector('.car-details-prompt').textContent = "2 Offers >";
        newcard.querySelector('.car-preview-name').style.backgroundColor = "white";
    } else {
        newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model;
        newcard.querySelector('.car-details-prompt').textContent = "Make Offers >";
    }

    newcard.querySelector('.car-preview-msrp').textContent = "$" + doc.data().trim[0].msrp;
    newcard.querySelector('.request-card').style.setProperty("background", `url(${doc.data().img[1]})`);
    newcard.querySelector('.request-card').style.setProperty("background-position", "center");
    newcard.querySelector('.request-card').style.setProperty("background-size", "cover");
    newcard.querySelector('a').href = 'carSell.html?vehicleID=' + vehicleID;
    target.appendChild(newcard);
}