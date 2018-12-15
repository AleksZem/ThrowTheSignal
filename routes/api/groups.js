const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  keys = require("../../config/keys"),
  firebaseAdmin = require("firebase-admin"),
  serviceAccount = require("../../config/throwthesignal-firebase-adminsdk-pxjhc-8f8cf08a94.json");

const User = require("../../models/User");
const Group = require("../../models/Group");

//init firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: keys.firebaseDatabaseURI
});

//////////////FIREBASE

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Well we got to the groups routes" })
);

// @route   POST api/groups
// @desc    create a group
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.groupname && req.body.description) {
      const newGroup = {
        groupname: req.body.groupname,
        description: req.body.description,
        members: [{ user: req.user.id }]
      };
      new Group(newGroup)
        .save()
        .then(group => {
          User.findById(req.user.id)
            .then(user => {
              user.groups.unshift(group.id);
            })
            .catch(err => console.log(err));
          return res.json(group);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
);

// @route   POST api/groups/:group_id
// @desc    Join group by group id
// @access  Private

//Post a message to a group for which the user is a member
router.post("/send/:group_id", (req, res) => {
  //Dummy route
  firebaseAdmin
    .messaging()
    .send({
      notification: {
        title: req.body.title,
        body: req.body.content
      },
      token:
        "cxehGhmpp4M:APA91bF2lie3MSgfTIuSf1NxrfKQylkh7yNlt3V-mSlS-2hEqFeL6MiyDNhUgTzffR6wGnCFMRLyQWdS3MS4o7qKFM46McVpDl57X2_GmnjtgH9fRWp4F-akYBfxSL4d9Ln8JI9_wwuN"
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
});

module.exports = router;
