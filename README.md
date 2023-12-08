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

## 4. Complete setup/installion/usage
* Download the project.
* Live-serving in VSCode will work.
* Create requests by searching for cars on the buy page, then clicking on a car and selecting the request button. Request deletion is in the same place. A refresh is required to view offers that other users make if you have not left the page recently.
* Create offers by searching for requests on the sell page. Click on a car that you want to sell, then select the requests you want to send an offer to. Fill in the fields and click send. Selecting multiple user requests will send copies of this offer to them.

## 5. Known Bugs and Limitations
* A signed-user is not automatically redirected to the home page when they access index.html. This is a bug only in the version deployed with Firebase.
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

Content of the project folder:

```

 Top level of project folder:

├── .gitignore               # Git ignore file

├── index.html               # landing HTML file, this is what users see when you come to url

└── README.md

  

It has the following subfolders and files:

├── .git                     # Folder for git repo

├── images                   # Folder for images

    /blah.jpg                # Acknowledge source

├── scripts                  # Folder for scripts

    /blah.js                 #

├── styles                   # Folder for styles

    /blah.css                #

  
  
  

```


