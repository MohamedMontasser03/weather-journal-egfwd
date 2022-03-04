// Setup empty JS object to act as endpoint for all routes
const projectData = {};

//setup dotenv for enviournment variables
require("dotenv");
// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log(`Server Listening on port ${port}`)
);

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
