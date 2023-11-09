//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
// function displayCardsDynamically() {
//     let cardTemplate = document.getElementById("myCarTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.

//     var userID;
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             userID = firebase.auth().currentUser.uid;

//             var userDocRef = db.collection("users").doc(userID);
//             var myPostsCollectionRef = userDocRef.collection("myPosts");
        
//             myPostsCollectionRef.get()   //the collection called "myPosts"
//                 .then(allmycars => {
//                     //var i = 1;  //Optional: if you want to have a unique ID for each hike
//                     allmycars.forEach(doc => { //iterate thru each doc
//                         var make = doc.data().make;       // get value of the "name" key
//                         var model = doc.data().model;  // get value of the "details" key
//                         var year = doc.data().year;    //get unique ID to each hike to be used for fetching right image
        
//                         let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
        
//                         //update title and text and image
//                         newcard.querySelector('.myCar-Info').innerHTML = year + " " + make + " " + model;
//                         // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
        
//                         //Optional: give unique ids to all elements for future use
//                         // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                         // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                         // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
        
//                         //attach to gallery, Example: "hikes-go-here"
//                         document.getElementById("myCars-go-here").appendChild(newcard);
        
//                         //i++;   //Optional: iterate variable to serve as unique ID
//                     })
//                 })
//         } else {
//             console.log("user is not signed in!");
//         }
//     });

// }


authenticateUser(function () {
    console.log(userID);
    displayCardsDynamically();

});

function displayCardsDynamically() {
    let cardTemplate = document.getElementById("myCarTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.
    console.log(userID)
            var userDocRef = db.collection("users").doc(userID);
            var myPostsCollectionRef = userDocRef.collection("myPosts");

    myPostsCollectionRef.get()   //the collection called "myPosts"
    .then(allmycars => {
        //var i = 1;  //Optional: if you want to have a unique ID for each hike
        allmycars.forEach(doc => { //iterate thru each doc
            var make = doc.data().make;       // get value of the "name" key
            var model = doc.data().model;  // get value of the "details" key
            var year = doc.data().year;    //get unique ID to each hike to be used for fetching right image

            let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

            //update title and text and image
            newcard.querySelector('.myCar-Info').innerHTML = year + " " + make + " " + model;
            // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

            //Optional: give unique ids to all elements for future use
            // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
            // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
            // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

            //attach to gallery, Example: "hikes-go-here"
            document.getElementById("myCars-go-here").appendChild(newcard);

            //i++;   //Optional: iterate variable to serve as unique ID
        })
    })

}


