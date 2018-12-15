const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  passport = require("passport");

//User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //User with this email already exists
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    } else {
      const newUser = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login as a user and return json web token
// @access  Public
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      //User with this email does not exist
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    } else {
      bcrypt.compare(req.body.password, user.password).then(foundMatch => {
        if (foundMatch) {
          const payload = {
            id: user.id,
            nickname: user.nickname,
            email: user.email
          };
          //Sign the web token
          jwt.sign(
            payload,
            keys.passportSecret,
            { expiresIn: 1024 },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                return res.json({
                  successfulLogin: true,
                  token: `Bearer ${token}`
                });
              }
            }
          );
        } else {
          return res.status(400).json({ error: "Incorrect password" });
        }
      });
    }
  });
});

// @route   GET api/users/current
// @desc    Returns the currently logged in user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      nickname: req.user.nickname,
      email: req.user.email
    });
  }
);

module.exports = router;
