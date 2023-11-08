// This file controls the dynamic style of the navbar.

// I don't know why this fixes the window load event not triggering...
setTimeout(() => {
    let evt = document.createEvent('Event');
    evt.initEvent('load', false, false);
    window.dispatchEvent(evt);
}, 300);

const currentUrl = window.location.href.split("/")[3];

//declaration to fix scope issues
let buyIcon;
let sellIcon;
let offersIcon;
let accountIcon;

let unselectedColor = "#444444";
let selectedColor = "#297373";

document.getElementById("buy-icon-obj").addEventListener("load", () => {
    console.log("buy icon loaded!");
    buyIcon = document.getElementById("buy-icon-obj").contentDocument.getElementById("buy-icon");
});

document.getElementById("sell-icon-obj").addEventListener("load", () => {
    console.log("sell icon loaded!");
    sellIcon = document.getElementById("sell-icon-obj").contentDocument.getElementById("sell-icon");
});

document.getElementById("offers-icon-obj").addEventListener("load", () => {
    console.log("offers icon loaded!");
    offersIcon = document.getElementById("offers-icon-obj").contentDocument.getElementById("offers-icon");
});

document.getElementById("account-icon-obj").addEventListener("load", () => {
    console.log("account icon loaded!");
    accountIcon = document.getElementById("account-icon-obj").contentDocument.getElementById("account-icon");
});

window.addEventListener("load", determineColor);

function determineColor() {
    console.log("hello from body!");
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
