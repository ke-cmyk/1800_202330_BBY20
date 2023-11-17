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
                        var vehicleImage2 = vehicleDoc.data().img[1];
            
                        let newcard = cardTemplate.content.cloneNode(true);

                        //update title and text and image
                        newcard.querySelector('.request-car-name p').innerHTML = year + " " + make + " " + model;
                        newcard.querySelector('.request-card').style.setProperty("background", `url(${vehicleImage2})`);
                        newcard.querySelector('.request-card').style.setProperty("background-position", "center");
                        newcard.querySelector('.request-card').style.setProperty("background-size", "cover");

                        //Optional: give unique ids to all elements for future use
                        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
            
                        //attach to gallery, Example: "hikes-go-here"
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
    searchInput = toTitleCase(searchInput);
    var carsCollectionRef = db.collection("vehicles").where("make", "==", searchInput);

    carsCollectionRef.get()
    .then(allmycars => {
        document.getElementById("myCars-go-here").innerHTML = ``;
        if (allmycars.size > 0) {
            allmycars.forEach(doc => {
                var make = doc.data().make;
                var model = doc.data().model;
                var year = doc.data().year;
                var vehicleID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.car-preview-name').innerHTML = year + " " + make + " " + model;
                newcard.querySelector('.request-card').style.setProperty("background", `url(${doc.data().img[1]})`);
                newcard.querySelector('.request-card').style.setProperty("background-position", "center");
                newcard.querySelector('.request-card').style.setProperty("background-size", "cover");
                newcard.querySelector('a').href = 'car.html?vehicleID=' + vehicleID;
                document.getElementById("myCars-go-here").appendChild(newcard);
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
    if (window.location.href.endsWith("buySearch.html") && event.key === "Enter" && document.querySelector("#search-bar").value != "") {
        searchCars();
    }
})