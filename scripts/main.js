const userID = firebase.auth().currentUser.uid;

function writeMyPosts() {
    // Define a reference to the user document
    // const userID = firebase.auth().currentUser.uid;
    var userDocRef = db.collection("users").doc(userID);

    // Define a reference to the "myPosts" collection within the user document
    var myPostsCollectionRef = userDocRef.collection("myPosts");

    // Add documents to the "myPosts" collection
    myPostsCollectionRef.add({
      year: 2018,
      make: "Tesla",
      model: "Model 3",
    });

    myPostsCollectionRef.add({
      year: 2016,
      make: "Honda",
      model: "Civic",
    });

    myPostsCollectionRef.add({
      year: 2022,
      make: "Toyota",
      model: "Prius Prime",
    });
  }