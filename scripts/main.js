function writeMyPosts() {
    //define a variable for the collection you want to create in Firestore to populate data
    var myCarsRef = db.collection("user").collection("myPosts");

    myCarsRef.add({
        year: 2018,
        make: "Tesla",
        model: "Model 3"
    });

    myCarsRef.add({
        year: 2016,
        make: "Honda",
        model: "Civic"
    });

    myCarsRef.add({
        year: 2022,
        make: "Toyota",
        model: "Prius Prime"
    });
}