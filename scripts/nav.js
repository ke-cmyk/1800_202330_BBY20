// This file controls the dynamic style of the navbar.

/** The last part of the url that ends with '.html'. */
const currentUrl = window.location.href.split("/")[3];

let unselectedColor = "#444444";
let selectedColor = "#386641";

/**
 * Switches the colour of each item in the central navbar 
 * based on which page was most recently selected.
 */
function determineColor() {
    if (currentUrl == "buy.html") {
        document.querySelector("#offer-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#buy-icon-container img").style.background = "rgba(255, 255, 255, 1)";
        document.querySelector("#sell-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#account-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";

    } else if (currentUrl == "sell.html") {
        document.querySelector("#offer-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#buy-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#sell-icon-container img").style.background = "rgba(255, 255, 255, 1)";
        document.querySelector("#account-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";

    } else if (currentUrl == "home.html") {
        document.querySelector("#offer-icon-container img").style.background = "rgba(255, 255, 255, 1)";
        document.querySelector("#buy-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#sell-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#account-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";

    } else if (currentUrl == "account.html") {
        document.querySelector("#offer-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#buy-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#sell-icon-container img").style.background = "rgba(255, 255, 255, 0.5)";
        document.querySelector("#account-icon-container img").style.background = "rgba(255, 255, 255, 1)";
    }
}
determineColor();
