# AutoBridge
## 1. Project Description
AutoBridge is a browser-based web application to help car buyers and sellers connect, save time, and negotiate pricing by implementing a reverse marketplace model, where sellers reach out to buyers with offers.

As a car buyer, the core feature AutoBridge implements is the creation and deletion of **requests**. When a user makes a request for a car, that request is visible to any sellers searching for them. Requests contain a buy price, what the user is willing to buy the car for.

As a car seller, the core feature is the creation and deletion of **offers**. When a user searches for requests that other users have made, they can send offers to the users who made those requests. The offer includes more detailed information about the seller's car, like the car's condition and an asking price. The requester recieves this offer and it is their decision whether to contact the seller to carry the conversation further.
## 2. Names of Contributors
* Hi, my name is Isaac! I'm new to web development and looking forward to building this app.
* Hi, my name is Aathavan! I am excited to start this journey of creating a web application.
* Hi my name is Kevin! I can't wait to see what great ideas come from this journey.
## 3. Technologies and Resources Used
* HTML, CSS, JavaScript (JQuery)
* Bootstrap 5.0 (Frontend library). Bootstrap is used minimally in most of the app. It's styling is used for the welcome page as well as some scaling of elements within the app.
* Firebase 8.0 (BAAS - Backend as a Service)
<hr>

* Icons: [Material Symbols](https://fonts.google.com/icons)

* Fonts: [Kanit](https://fonts.google.com/specimen/Kanit) from Google Fonts and [Petrov Sans](https://www.dafont.com/petrov-sans.font)

* Car Images and Data: [Edmunds](https://www.edmunds.com/)

## 4. Complete setup/installation/usage
* Download the project.
* Live-serving in VSCode will work.
* Create requests by searching for cars on the buy page, then clicking on a car and selecting the request button. Request deletion is in the same place. A refresh is required to view offers that other users make if you have not left the page recently.
* Create offers by searching for requests on the sell page. Click on a car that you want to sell, then select the requests you want to send an offer to. Fill in the fields and click send. Selecting multiple user requests will send copies of this offer to them.

## 5. Known Bugs and Limitations
* A signed-user is not automatically redirected to the home page when they access index.html. This is a bug only in the version deployed with Firebase.
* Users with no account will still be served most of the html and js for most pages instead of immediately being redirected, preventing that information from having been loaded at all.
* There is no limit to how many offers a user can send another user's request, i.e. there are no spam-prevention measures.
* There is no input validation for the number a user inputs for the buying or asking price of a car, which is why the fields are disabled with JavaScript. If this code is removed, nothing will currently break because no math is performed with those values.
* Users cannot archive requests, only delete them.
* Users are not notified of changes to the status of their offers. There is no notification that your offer was deleted because its parent request was, it just silently disappears.

## 6. Features for Future
* An in-app chat function
* Image uploading for sellers
* Archival of requests
* A dedicated desktop layout
* An API-populated cars database
* More fields to search cars by, ideally in conjunction with a smart search feature using AI
* An AI recommendation system
## 7. Contents of Folder

```
│   .gitignore          # Git ignore file
│   404.html            # 404 page
│   account.html        # Main account page for viewing your details and signing out
│   buy.html            # Main buy page, contains your requested cars
│   buySearch.html      # Car search page
│   car.html            # Page for viewing car or request details
│   carSell.html        # Page for viewing and selecting requests as a seller
│   editAccount.html    # Page for editing account details: name, email, location, phone, and profile picture
│   favicon.ico         # favicon
│   home.html           # Main home page. Where signed-in users are directed to
│   index.html          # Landing page, where non-signed in users are directed to
│   login.html          # Login page, powered by Firebase authentication
│   offerDetails.html   # Page to view the details of an offer a user has sent your request
│   offerForm.html      # Page to input offer details and send to requesters
│   pageTemplate.html   # Empty page template that contains the necessary structure and scripts for a signed-in page.
│   README.md           # readme file.
│   sell.html           # Main sell page for viewing your offers.
│   sellSearch.html     # Request search page
│   sentOffers.html     # Page for viewing your sent offers for a particular car.
│   storage.rules       # Firebase storage rules
│
├───.firebase
│       hosting..cache
│
├───images              # Folder for storing images
│   │   back.svg            # Back arrow
│   │   background.png      # Background present on all pages
│   │   chevronRight.svg    # An arrow pointing right
│   │   defaultAccount.svg  # The default svg used for new user profiles. The copy used is on firebase, so changing this has no effect
│   │   expandLess.svg      # An arrow pointing up 
│   │   expandMore.svg      # An arrow pointing down
│   │   header.svg          # The AutoBridge header logo
│   │   logo.svg            # The AutoBridge logo
│   │   request.svg         # The svg on the car search button on the buy page
│   │   search.svg          # A magnifying glass
│   │   sellCar.svg         # The svg on the request search button on the sell page
│   │   sellWhite.svg       # A white version of the sell icon
│   │
│   └───nav icons       # The icons used in the nav bar
│           account.svg     # an account icon
│           buy.svg         # a shopping cart icon
│           home.svg        # a house icon
│           offers.svg      # a car icon
│           request.svg     # a car with a plus sign icon
│           sell.svg        # a price tag icon
│
├───json                # json files
│       mock_vehicles.json  # the JSON file used to populate the database with cars to search
│
├───scripts             # All scripts. Refer to the top of each document to see which pages they run on.
│       account.js          # Populates the account page with user data.
│       accountEdit.js      # Populates the account edit page and handles information submission.
│       authentication.js   # Handles user authentication.
│       buy.js              # Handles request display and car card display.
│       car.js              # Displays car details and offers for requests for a buyer.
│       carSell.js          # Displays car details and requests for a car for a seller.
│       dataUpload.js       # Utility script used to initially parse JSON of cars and upload to Firestore.
│       home.js             # Loads recommendations.
│       nav.js              # Controls the coloring of the navbar depending on the page.
│       offerDetails.js     # Loads the details for a single offer.
│       offerForm.js        # Handles the creation of offers.
│       script.js           # Contains common system-wide functions.
│       sell.js             # Handles display and search of requests.
│       sentOffers.js       # Handles the display and deletion of offers the current user has sent.
│       skeleton.js         # Loads the navbar and header. Also boots user back to index if they are not signed in.
│
├───styles              # All stylesheets.
│       account.css         # For account.html and editAccount.html.
│       buy.css             # For buy.html.
│       car.css             # For car.html.
│       carSell.css         # For carSell.html.
│       header_after_login.css  # For the header.
│       home.css            # For home.html.
│       nav_after_login.css # For te navbar.
│       offerDetails.css    # For offerDetails.html.
│       offerForm.css       # For offerForm.html.
│       search.css          # For buySearch.html and sellSearch.html.
│       sell.css            # For sell.html and carSell.html.
│       sentOffers.css      # For sentOffers.html
│       style.css           # For all pages.
│
└───text                # HTML that is programmatically loaded as elements of other pages.
        footer.html             # An unused Bootstrap footer.
        header_after_login.html # The main-page header.
        header_back_button.html # The sub-page header.
        nav_after_login.html    # The navbar.
        nav_before_login.html   # An unused Bootstrap header for index.html.
        offer_success.html      # The success popup for when a user makes an offer.
        request_success.html    # The success popup for when a user makes a request.
```


