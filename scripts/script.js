function toTitleCase(str) {
    let firstLetter = str.substr(0, 1).toUpperCase();
    let restOfWord = str.substr(1,str.length).toLowerCase();
    let fullWord = firstLetter + restOfWord;
    return fullWord;
}