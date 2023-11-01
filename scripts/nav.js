// This file controls the dynamic style of the navbar.

let buyNav = document.getElementById("buy-icon-container");
let sellNav = document.getElementById("sell-icon-container");
let myCarsNav = document.getElementById("offer-icon-container");
let accountNav = document.getElementById("account-icon-container");

buyNav.addEventListener("click", buySwitch);
sellNav.addEventListener("click", sellSwitch);
myCarsNav.addEventListener("click", myCarsSwitch);
accountNav.addEventListener("click", accountSwitch);

function buySwitch() {
    buyNav.style.backgroundColor = "var(--secondary-color)";
    buyNav.style.filter = "opacity(1)";
    sellNav.style.backgroundColor = "whitesmoke";
    sellNav.style.filter = "opacity(0.7)";
    myCarsNav.style.backgroundColor = "whitesmoke";
    myCarsNav.style.filter = "opacity(0.7)";
    accountNav.style.backgroundColor = "whitesmoke";
    accountNav.style.filter = "opacity(0.7)";
}
function sellSwitch() {
    buyNav.style.backgroundColor = "whitesmoke";
    buyNav.style.filter = "opacity(0.7)";
    sellNav.style.backgroundColor = "var(--secondary-color)";
    sellNav.style.filter = "opacity(1)";
    myCarsNav.style.backgroundColor = "whitesmoke";
    myCarsNav.style.filter = "opacity(0.7)";
    accountNav.style.backgroundColor = "whitesmoke";
    accountNav.style.filter = "opacity(0.7)";
}
function myCarsSwitch() {
    buyNav.style.backgroundColor = "whitesmoke";
    buyNav.style.filter = "opacity(0.7)";
    sellNav.style.backgroundColor = "whitesmoke";
    sellNav.style.filter = "opacity(0.7)";
    myCarsNav.style.backgroundColor = "var(--secondary-color)";
    myCarsNav.style.filter = "opacity(1)";
    accountNav.style.backgroundColor = "whitesmoke";
    accountNav.style.filter = "opacity(0.7)";
}
function accountSwitch() {
    buyNav.style.backgroundColor = "whitesmoke";
    buyNav.style.filter = "opacity(0.7)";
    sellNav.style.backgroundColor = "whitesmoke";
    sellNav.style.filter = "opacity(0.7)";
    myCarsNav.style.backgroundColor = "whitesmoke";
    myCarsNav.style.filter = "opacity(0.7)";
    accountNav.style.backgroundColor = "var(--secondary-color)";
    accountNav.style.filter = "opacity(1)";
}

