//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Create new link Element
            let link = document.createElement('link');
    
            // set the attributes for link element
            link.rel = 'stylesheet';
        
            link.type = 'text/css';
        
            link.href = './styles/nav_after_login.css';

            link.id = "nav-style";
    
            // Append link element to HTML head
            document.head.appendChild(link);
            console.log($('#headerPlaceholder').load('./text/header_after_login.html'));
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#headerPlaceholder').load('./text/header_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        }
    });
}
loadSkeleton();