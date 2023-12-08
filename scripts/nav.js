/**
 * Loaded on:
 * all pages, through the loading of nav_after_login.html
 */

/** The last part of the url that ends with '.html'. */
let currentUrlFull = window.location.href.split("/")[3];
let currentUrl;
if (currentUrlFull.includes("?")) {
    currentUrl = currentUrlFull.substring(0, currentUrlFull.indexOf("?"));
} else {
    currentUrl = currentUrlFull;
}

console.log(currentUrl);

let unselectedColor = "#444444";
let selectedColor = "#386641";

// Used to determine the color of the navbar highlighting based on which page array the current page matches.
// Each array represents the pages a particular navbar icon should be highlighted.
let homePages = ["home.html"];
let buyPages = ["buy.html", "car.html", "buySearch.html", "offerDetails.html"];
let sellPages = ["sell.html", "carSell.html", "sellSearch.html", "sentOffers.html", "offerForm.html"];
let accountPages = ["account.html", "editAccount.html"];

/**
 * Switches the colour of each item in the central navbar 
 * based on which page the user is currently on.
 */
function determineColor() {
    if (buyPages.includes(currentUrl)) {
        document.querySelector("#buy-icon-container").style.borderTop = "4px solid var(--secondary-color)";

    } else if (sellPages.includes(currentUrl)) {
        document.querySelector("#sell-icon-container").style.borderTop = "4px solid var(--secondary-color)";

    } else if (homePages.includes(currentUrl)) {
        document.querySelector("#offer-icon-container").style.borderTop = "4px solid var(--secondary-color)";

    } else if (accountPages.includes(currentUrl)) {
        document.querySelector("#account-icon-container").style.borderTop = "4px solid var(--secondary-color)";
    }
}
determineColor();