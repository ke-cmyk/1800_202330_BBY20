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