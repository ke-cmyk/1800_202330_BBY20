function toTitleCase(str) {
    let result = "";
    let wordCount = 0;
    strArray = str.split(/[ -]/);
    strArray.forEach((word) => {
        if (word.length < 4) {
            result += word;
        } else {
            result += word.substring(0, 1).toUpperCase() + word.substring(1);
        }
        if (wordCount < strArray.length - 1) {
            result += " ";
        }
        wordCount++;
    })
    return result;
}

/**
 * Returns the text at the specified url for placement in documents.
 * Source: https://stackoverflow.com/questions/17636528/how-do-i-load-an-html-page-in-a-div-using-javascript
 * By Lucio Paiva https://stackoverflow.com/users/778272/lucio-paiva
 * 
 * @param {*} url 
 * @returns the text at the url
 */
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

// function deleteEverything(verifier) {
//     if (verifier == "Yes") {
//         db.collection("requests").get().then(docs => {
//             docs.forEach(doc => {
//                 console.log(doc.id);
//                 db.collection("requests").doc(doc.id).delete().then(() => {
//                     console.log("document deleted");
//                 });
//             })
//         })
//         db.collection("offers").get().then(docs => {
//             docs.forEach(doc => {
//                 console.log(doc.id);
//                 db.collection("offers").doc(doc.id).delete().then(() => {
//                     console.log("document deleted");
//                 });
//             })
//         })

//     } else {
//         console.log("the parameter is 'Yes'.");
//     }
// }