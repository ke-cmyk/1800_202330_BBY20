//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let navLink = document.createElement('link');
            navLink.rel = 'stylesheet';
            navLink.type = 'text/css';
            navLink.href = './styles/nav_after_login.css';
            navLink.id = "nav-style";
            document.head.appendChild(navLink);

            let headerLink = document.createElement('link');
            headerLink.rel = 'stylesheet';
            headerLink.type = 'text/css';
            headerLink.href = './styles/header_after_login.css';
            headerLink.id = "nav-style";
            document.head.appendChild(headerLink);

            // loads either the main header or the back button header
            // depending on if you are on one of the 4 main pages or not.
            if (document.body.getAttribute("main") === "true"){
                console.log($('#headerPlaceholder').load('./text/header_after_login.html'));
            } else {
                console.log($('#headerPlaceholder').load('./text/header_back_button.html'));
            }
            
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#headerPlaceholder').load('./text/nav_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        }
    });
}
loadSkeleton();