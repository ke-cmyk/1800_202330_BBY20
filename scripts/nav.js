// This file controls the dynamic style of the navbar.

// Fixes window load event not triggering
setTimeout(() => {
    let evt = document.createEvent('Event');
    evt.initEvent('load', false, false);
    window.dispatchEvent(evt);
}, 200);

/** The last part of the url that ends with '.html'. */
const currentUrl = window.location.href.split("/")[3];

let unselectedColor = "#444444";
let selectedColor = "#386641";


window.addEventListener("load", determineColor);

/**
 * Switches the colour of each item in the central navbar 
 * based on which page was most recently selected.
 */
function determineColor() {
    if (currentUrl == "buy.html") {
        
    } else if (currentUrl == "sell.html") {
        
    } else if (currentUrl == "home.html") {
        
    } else if (currentUrl == "account.html") {
        
    }
}



// function changeNavColor(id) {
//     if (id == "buy-icon-container") {
//         buyIcon.style.fill = "red";
//     }
// }
