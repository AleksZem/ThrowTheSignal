const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const groups = require("./routes/api/groups");

const application = express();

//Listening port
const port = process.env.PORT || 5000;

//Configure body-parser
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false })); //Shallow parse
//Configure Passport
application.use(passport.initialize());
require("./config/passport")(passport);

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

application.use("/api/users", users);
application.use("/api/groups", groups);

application.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);
