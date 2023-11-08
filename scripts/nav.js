// This file controls the dynamic style of the navbar.

const currentUrl = window.location.href.split("/")[3];

var buyIcon = document.getElementById("buy-icon-obj").contentDocument.getElementById("buy-icon");

var sellIcon = document.getElementById("sell-icon-obj").contentDocument.getElementById("sell-icon");

var offersIcon = document.getElementById("offers-icon-obj").contentDocument.getElementById("offers-icon");

var accountIcon = document.getElementById("account-icon-obj").contentDocument.getElementById("account-icon");

if (currentUrl == "buy.html") {
    buyIcon.style.fill = "#297373";
    sellIcon.style.fill = "black";
    offersIcon.style.fill = "black";
    accountIcon.style.fill = "black";
} else if (currentUrl == "sell.html") {
    buyIcon.style.fill = "black";
    sellIcon.style.fill = "#297373";
    offersIcon.style.fill = "black";
    accountIcon.style.fill = "black";
} else if (currentUrl == "mycars.html") {
    buyIcon.style.fill = "black";
    sellIcon.style.fill = "black";
    offersIcon.style.fill = "#297373";
    accountIcon.style.fill = "black";
} else if (currentUrl == "account.html") {
    buyIcon.style.fill = "black";
    sellIcon.style.fill = "black";
    offersIcon.style.fill = "black";
    accountIcon.style.fill = "#297373";
}

// function changeNavColor(id) {
//     if (id == "buy-icon-container") {
//         buyIcon.style.fill = "red";
//     }
// }
