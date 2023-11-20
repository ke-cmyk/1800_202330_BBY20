

function toTitleCase(str) {
    if (str.length <= 3) {
        return str.toUpperCase();
    }

    let firstLetter = str.substr(0, 1).toUpperCase();
    let restOfWord = str.substr(1,str.length).toLowerCase();
    let fullWord = firstLetter + restOfWord;

    if (str.includes("-")) {
        let secondWord = fullWord.split("-")[1];
        firstLetter = secondWord.substr(0, 1).toUpperCase();
        restOfWord = secondWord.substr(1,str.length).toLowerCase();
        fullWord = fullWord.split("-")[0] + "-" + firstLetter + restOfWord;
    }
    return fullWord;
}