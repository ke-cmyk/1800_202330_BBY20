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
        userDoc.data().requests.forEach(requestId => {
            if (requestId != "") {
                db.collection("requests").doc(requestId).get()
                .then(requestDoc => {
                    db.collection("vehicles").doc(requestDoc.data().vehicleID).get()
                    .then(vehicleDoc => {
                        var make = vehicleDoc.data().make;
                        var model = vehicleDoc.data().model;
                        var year = vehicleDoc.data().year;
            
                        let newcard = cardTemplate.content.cloneNode(true);
            
                        //update title and text and image
                        newcard.querySelector('.request-car-name').innerHTML = year + " " + make + " " + model;

                        // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

                        document.getElementById("requests-container").appendChild(newcard);
                    })

                })
            }

        })
    })

}

function searchCars() {
    let cardTemplate = document.getElementById("search-results");
    let searchInput = document.querySelector("#search-bar").value;
    var carsCollectionRef = db.collection("vehicles").where("make", "==", searchInput);

    carsCollectionRef.get()
    .then(allmycars => {
        allmycars.forEach(doc => {
            var make = doc.data().make;
            var model = doc.data().model;
            var year = doc.data().year;
            var vehicleID = doc.id;
            let newcard = cardTemplate.content.cloneNode(true);
            newcard.querySelector('.request-car-name').innerHTML = year + " " + make + " " + model;
            newcard.querySelector('a').href = 'car.html?vehicleID=' + vehicleID;
            document.getElementById("myCars-go-here").appendChild(newcard);
        })
    })
}

