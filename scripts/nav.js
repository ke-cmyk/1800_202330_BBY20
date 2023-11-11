// This file controls the dynamic style of the navbar.

// Fixes window load event not triggering
setTimeout(() => {
    let evt = document.createEvent('Event');
    evt.initEvent('load', false, false);
    window.dispatchEvent(evt);
}, 200);

const currentUrl = window.location.href.split("/")[3];

//declaration to fix scope issues
let buyIcon;
let sellIcon;
let offersIcon;
let accountIcon;

let unselectedColor = "#444444";
let selectedColor = "#6cd86c";

document.getElementById("buy-icon-obj").addEventListener("load", () => {
    buyIcon = document.getElementById("buy-icon-obj").contentDocument.getElementById("buy-icon");
});
document.getElementById("sell-icon-obj").addEventListener("load", () => {
    sellIcon = document.getElementById("sell-icon-obj").contentDocument.getElementById("sell-icon");
});
document.getElementById("offers-icon-obj").addEventListener("load", () => {
    offersIcon = document.getElementById("offers-icon-obj").contentDocument.getElementById("offers-icon");
});
document.getElementById("account-icon-obj").addEventListener("load", () => {
    accountIcon = document.getElementById("account-icon-obj").contentDocument.getElementById("account-icon");
});

window.addEventListener("load", determineColor);

function determineColor() {
    if (currentUrl == "buy.html") {
        buyIcon.style.fill = selectedColor;
        sellIcon.style.fill = unselectedColor;
        offersIcon.style.fill = unselectedColor;
        accountIcon.style.fill = unselectedColor;
    } else if (currentUrl == "sell.html") {
        buyIcon.style.fill = unselectedColor;
        sellIcon.style.fill = selectedColor;
        offersIcon.style.fill = unselectedColor;
        accountIcon.style.fill = unselectedColor;
    } else if (currentUrl == "mycars.html") {
        buyIcon.style.fill = unselectedColor;
        sellIcon.style.fill = unselectedColor;
        offersIcon.style.fill = selectedColor;
        accountIcon.style.fill = unselectedColor;
    } else if (currentUrl == "account.html") {
        buyIcon.style.fill = unselectedColor;
        sellIcon.style.fill = unselectedColor;
        offersIcon.style.fill = unselectedColor;
        accountIcon.style.fill = selectedColor;
    }
}



// function changeNavColor(id) {
//     if (id == "buy-icon-container") {
//         buyIcon.style.fill = "red";
//     }
// }
