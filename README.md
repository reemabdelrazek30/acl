# Cast Away

Cast Away is a web application for an Airline Reservation System. It is built using the MERN Stack (MongoDB, Express, React and Node.js).

Currently, the web application only handles one user -an admin- who can add to, remove from, edit, and search for flights in the flight schedule. We're still planning on adding guest users and signed-in users, and designing a good UI/UX for the website.

# Motivation

The motivation is to build a user-friendly web application to an airport reservation system.

# Build Status

- in the reseve seat, we designed it such that the user chooses the depature seats and after clicking the reseve button, the user will be redirected to choose his/her return seat, the bug/error ocurrs firstly when user is choosing the departure seat and selects an incorret number of seats, thus leading to an popup message and returns him to the page to reselect the seats, here the problem occurs, as the user will find the number of seats have been duplicated (since the page has been refreshed mapping of the seats occured again, leading to duplcation of the original amount of seats).the same problem occurs when the user procceeds to reseve the return seat.


# Code Style

- standared style was used along with an semi-successfull attept to create MVC

# Project Architecture:
## The project itself is split into two main folders:
### Client folder:
- which contains the front-end part. It mainly includes the components of the front-end and the App.js file, which deals with routing from the homepage to the other components. 
#### The Components:
## from admin point of view :
    - admin can login (login.js) 
    - if admin logs in succesfully, he is redirected to admin home page (Hpage.js) which includes two button, either to view flights or create flight
        - if Admin presses view flights, he will be redirected to (Flight.js-> which is linked to ReadableRow.js (to be able to diplay the flights) , & linked to EditFlightRow.js( so that the admin can edit the flight he chose to edit) & linked to searchFlight.js (for admin to be able to filter/search through the filters) & linked to Popup.js (so that the admin can delete flight))
        - if admin presses create flight, hw will be redirected into createFlights.js

## from user point of view:
    - user can login (login.js)
    - if user logs in succesfully, he will be redirected user home page(User.js) which includes 3 buttons,1. reserve flight 2.view reserved tickets 3.profile

        1.reseve flight: user will be redirected to (ReseveFlight.js) where user will need to fill in the form and press see available flights (ViewFlight.js), which will lead to appearance of the available departure flights, user selects desired flight ,proceed, selects desired return flight, press select seats which will redirect him to (ReserveSeat.js), here the user will first select his departure seat > press reserve button> selesct his return seat > press reserve button which will redirect him to the summary (Summary.js) > and when he presses the confirm button> procceed to payment (payment.js)

        2.view reserved ticket : user will be redirected to (ViewFlights.js) where he can delete ticket or change a seat in a specific flight or overall change a departure or return flight. if user chooses to:
                - change a seat: user will be redirected to (ReserveSeats.js), wre he will reserve his seat and be redirected back to(ViewFlights.js)  

                -change a departure flight: (Changedepartureflight.js) user will fill in the form and submit >>(Viewavailabledepflight.js) to view available flights and select one of them to select it's seat >> (ReserveSeats.js) to choose desired seat number and when user press reseve button he will be redirected to a popup (Confirmupdateflight.js) where user can confirm the update he is making and be redirected back to(ViewFlights.js)  

                -change return flight: same process as change departure flight but using the components: ChangeReturnFlight.js > Viewavailableretuenflight.js> ReserveSeats.js > Confirmupdateflight.js > and back to ViewFlights.js

                -delete ticket :there will be a popup message when user clicks on delete flight (confirmdelete.js)

        3.View Profile : user will be redirected to (Profile.js) where he can view his information and edit it.


- search_frontend: 
### Server folder:
- which deals with the back-end. It connects to the database, and it contains methods that retrieve, delete and update data in the database, and has the Schema of the Flights and Users.


# Connection
- To connect to the Server (on Port 3001):
    - In the terminal, go inside the Server directory, then connect using the command "node index.js"
- To start the web application:
    - Split the terminal, go inside the Client directory, the run using "npm start"

# Installation
## You'll need these modules installed in Node.js:
- npm
- Axios
- Mongoose
- Express
- React
- cors 
### Note:
you can write "npm install" in the terminal, and all the required dependencies for the project will be installed.

# Credits: 
Full-Stack Squad Team 🙂