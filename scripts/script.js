/* Loaded on:
 * Every page.
 */

/**
 * The workhorse of AutoBridge's case-insentive search functionality. This function formats a string to be in capitalized form,
 * with exceptions for hypenated strings and strings with a length of less than 4 letters which signifies that it is an
 * acronym and should remain fully uppercase.
 * @param {string} str 
 * @returns the resulting capitalized string.
 */
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