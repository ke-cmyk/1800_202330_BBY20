authenticateUser(() => {
    console.log(userID);

    if (window.location.href.endsWith("sell.html")) {
        // displayCardsDynamically();
        document.getElementById("find-car-btn").addEventListener("click", () => {
            window.location.href = "sellSearch.html";
        })
    }
});

