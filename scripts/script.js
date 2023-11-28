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
 * 
 * @param {*} url 
 * @returns the text at the url
 */
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}