# Wiki

## To run the project locally

1. run "npm install"
2. run "npm start"

Application is run on localhost:3000

## Some of the assumptions and design considerations that I have made include:

* Design principals and components was based upon Material UI (MUI) philosophies. The reason this library was chosen is because I am most familiar with it and it is relatively easy and fast to implement to a project.
* A backend was set up in order to accomodate and store user login and bookings info. Firebase/Firestore was used in this case in order to achieve this because of it's simplicity in setting up both the database and authentication functions.
* Users will only be able to book movies if they are logged in, and assuming once the movie is booked it cannot be undone.
* Users will be able to view their booked movies in the Account page.
* Pull to refresh feature was not implemented due to the application having an infinite load feature and that feature is more suited for a full mobile application instead.
* Movie list was taken based on the release year for 2021 and are all in English as the primary language.
* No unit testing was conducted during the process because I have no experience in it.
* Typescript was not used for this project because I am not familiar with it.

## Some of the improvements I would make to the existing application:

* Implementing Redux for better state management.
* Migrate stylings to separate folders in order for easy management.
* Seperate components down into reuseable ones.
* Apply more movie filters based on different fields.
* Implement a dark mode for better readability.
* Improve overall design with custom stylings and components.
* Implement validation for sign in and sign ups.
* Convert to Typescript.
* Implement unit testing using Jest.
