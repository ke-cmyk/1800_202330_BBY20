//-----------------------------------------------------------------------
// Read the file called "mock_vehicles.json"
// and save it to Firestore vehicles collection.
// The file must on on server (ie, use "Live Server") for fetch to work.
//-----------------------------------------------------------------------
function readJsonAndSaveToFirestore() {
    fetch('json/mock_vehicles.json')
      .then(response => response.json())
      .then(data => {
        // Assuming `data` is an array of objects and you have a collection called 'vehicles'
        const batch = db.batch();

        data.forEach((vehicle, index) => {
          // Here, we're generating a new document ID for each vehicle.
          // If your vehicle have unique IDs, use `doc(vehicle.id)` instead.
          var docRef = db.collection('vehicles').doc(); // Auto-generate new ID
          batch.set(docRef, vehicle);

          // Firestore batch has a limit of 500 operations per batch.
          // If you approach this limit, you'd need to handle multiple batches.
        });

        // Commit the batch
        return batch.commit().then(() => {
          console.log('Successfully saved data to Firestore!');
        });
      })
      .catch(error => {
        console.error('Error reading JSON file or saving to Firestore:', error);
      });
  }