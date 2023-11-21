authenticateUser(() => {
    displayCardsDynamically();
})

function displayCardsDynamically() {

    let params = new URL(window.location.href); //get URL of search bar
    let vehicleID = params.searchParams.get("vehicleID"); //get value for key "vehicleID"

    let cardTemplate = document.getElementById("requests");
    // console.log(cardTemplate);
    // let userDocRef = db.collection("users").doc(userID);

    // carsCollectionRef = carsCollectionRef.where("make", "==", makeTerm);

    let vehicleRequests = db.collection("requests").where("vehicleID", "==", vehicleID);

    vehicleRequests.get()
        .then(querySnapshot => {
            querySnapshot.forEach(vehicleRequestsDoc => {

                let requesterID = vehicleRequestsDoc.data().requesterID;

                let userDocRef = db.collection("users").doc(requesterID);

                // Get the document
                userDocRef.get()
                    .then(userDoc => {
                        if (userDoc.exists) {
                            // Document found, you can access the data using userDoc.data()
                            // console.log("User document data:", userDoc.data());

                            var name = userDoc.data().name;
                            var location = userDoc.data().city;
                            var picture = userDoc.data().picture;

                            let newcard = cardTemplate.content.cloneNode(true);

                            // newcard.querySelector('.request-car-name p').innerHTML = year + " " + make + " " + model;
                            newcard.querySelector('#requester-name').innerHTML = name;
                            newcard.querySelector('#requester-location').innerHTML = location;

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


                // // Access individual documents within the query results
                // console.log(vehicleRequestsDoc.id, " => ", vehicleRequestsDoc.data());

                // // You can extract specific fields from the document
                // let requestId = vehicleRequestsDoc.id;
                // let requestData = vehicleRequestsDoc.data();

                // // Now you can use requestId and requestData as needed

                // if (requestId != "") {
                //     db.collection("requests").doc(requestId).get()
                //     .then(requestDoc => {
                //         // Retrieve the requesterID from the request document
                //         let requesterID = requestDoc.data().requesterID;

                //         // Use requesterID to query the users collection
                //         db.collection("users").doc(requesterID).get()
                //         .then(userDoc => {
                //             // Access user information
                //             let userName = userDoc.data().name;
                //             let userLocation = userDoc.data().location;

                //             // Continue with the rest of your code
                //             // ...

                //             // Example: Log user information
                //             console.log("User Name:", userName);
                //             console.log("User Location:", userLocation);
                //         })
                //     })
                // }


    // userDocRef.get()
    // .then(userDoc => {
    //     userDoc.data().requests.forEach(requestId => {
    //         if (requestId != "") {
    //             db.collection("requests").doc(requestId).get()
    //             .then(requestDoc => {
    //                 db.collection("vehicles").doc(requestDoc.data().vehicleID).get()
    //                 .then(vehicleDoc => {
    //                     var make = vehicleDoc.data().make;
    //                     var model = vehicleDoc.data().model;
    //                     var year = vehicleDoc.data().year;
    //                     var vehicleImage2 = vehicleDoc.data().img[1];

    //                     let newcard = cardTemplate.content.cloneNode(true);

    //                     //update title and text and image
    //                     newcard.querySelector('.request-car-name p').innerHTML = year + " " + make + " " + model;
    //                     newcard.querySelector('.request-card').style.setProperty("background", `url(${vehicleImage2})`);
    //                     newcard.querySelector('.request-card').style.setProperty("background-position", "center");
    //                     newcard.querySelector('.request-card').style.setProperty("background-size", "cover");

    //                     //Optional: give unique ids to all elements for future use
    //                     // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
    //                     // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
    //                     // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

    //                     //attach to gallery, Example: "hikes-go-here"
    //                     document.getElementById("requests-container").appendChild(newcard);
    //                 })

    //             })
    //         }

    //     })
    // })