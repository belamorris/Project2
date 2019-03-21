# Group Project 2
Look Alike - Find Your Doppelganger - Photo Comparison Matching Application

## The Task 

The task was to implement Node JS, Express JS, and a MySQL database using an ORM within a MVC paradigm to create an application employing servers to run the app as a website. 

## Site Overview 
This single page style site presents the user with concise instructions and an intuitive interface. The user is asked to enter their name and an image URL. After this information is entered, they simply hit the button titled "Doppelganger Me" and the user's photo is compared against a set of stored photos to find that which has the highest confidence match. As the search commences, the user is shown the image, name, and confidence match of each comparison run. Once the comparison matching process is complete, an alert appears indicating that a best match was found. When the user clicks on the "Ok" button in the alert, their best match appears along with the confidence level of the match, presented as Best Match %. The bottom, left-hand side of the screen shows a count indicator that provides information regarding how many clients are currently on the site. User information input into the site is saved in the database.

## Run App Through Heroku Deployement
Try the [App](https://infinite-badlands-40246.herokuapp.com/).
 
## Getting Started on Your Own Machine
1. Clone [repo](https://github.com/dtries/Project2.git) to your machine. 
1. Navigate to the Project2 directory on your maching using GitBash or your terminal.
1. Enter 'npm install' in GitBash or your terminal.
   * This will install the proper js package files from a package JSON file.
1. The schema_photolibaries_local.sql and seeds_photolibraries_local.sql files are provided so that you may create the database and table as well as seed the table with values for initial application use.
   
   ## Running on a Local Server
   1. Enter 'node server.js' this will open a local server on your machine. 
   1. Your terminal will display which port the app is using, in this case 3000.
   1. Open up a browser window and type in 'localhost:3000', this will open the homepage for Look Alike - Find Your Doppelganger
     
## User Actions:
   1. Enter First Name.       
   1. Enter Image URL.
   1. Press button titled "Doppelganger Me" to begin image matching process.
   
## Tech Employed
* Node.js - (see below)
* Express.js - https://www.npmjs.com/package/express
* Sequelize - https://www.npmjs.com/package/sequelize
* MySQL2 - https://www.npmjs.com/package/mysql2
* Path.js - https://www.npmjs.com/package/path
* JQuery - https://jquery.com/
* Handlebars - http://handlebarsjs.com/
* Express-Handlebars - https://www.npmjs.com/package/express-handlebars
* Socket.io - https://www.npmjs.com/package/socket.io
* Materialize - https://materializecss.com/
* ESLint - https://eslint.org/
* JawsDB MySQL - add on available on heroku 

## Prerequisites
* Node.js - The latest version of Node is available at: https://nodejs.org/en/

## Built With
VS Code - Text Editor
## Authored and Maintained By:
* Dennis Ries
* Robert Morris
* Cole Hilgers

Contact: dtries@gmail.com

© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
