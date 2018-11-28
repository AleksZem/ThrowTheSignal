const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const application = express();

//Configure body-parser
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false })); //Shallow parse

//Database uri
const dbUri = require("./config/keys").databaseURI;

//Validate database connection with successful
mongoose
  .connect(
    dbUri,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Database connection was established successfully"))
  .catch(err =>
    console.log(`DATABASE CONNECTION COULD NOT BE ESTABLISH: ${err}`)
  );
