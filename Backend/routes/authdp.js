const { response } = require("express");
const express = require("express");
const User = require("../models/Usersdp");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../Middleware/fetchUser");

const JWT_SECRET = "Helloo!!Youarecute$#@";

//Creating a user using POST "/api/v1/auth"

router.post(
  "/signupdp",
  [
    body("name", "Name length should be minimum 3").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password length should be minimum 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (await User.findOne({ email: req.body.email })) {
        return res
          .status(400)
          .json({ errors: "An account is already created with this email" });
      }

      if (await User.findOne({ username: req.body.username })) {
        return res
          .status(400)
          .json({ errors: "Sorry this username already exists" });
      }

      if (await User.findOne({ phoneNo: req.body.phoneNo })) {
        return res.status(400).json({
          errors: "An account is already created with this Phone Number",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const SecPassword = await bcrypt.hash(req.body.password, salt);

      let user = await User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: SecPassword,
        profilePhoto: req.body.profilePhoto,
        phoneNo: req.body.phoneNo,
        location: req.body.location,
      });
      user
        .save()
        .then((data) => {
          const Data = {
            user: {
              id: user.id,
            },
          };

          const AuthToken = jwt.sign(Data, JWT_SECRET);
          res.json({ AuthToken });
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

//Authenticating a user using POST "/api/v1/auth/login"

router.post(
  "/logindp",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Passsword Cannot be Blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Sorry the user does not exist" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }

      const Data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(Data, JWT_SECRET);
      res.json({ AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

//Get logged in user details using POST "/api/v1/auth/getuser"

router.post(
  "/getuserdp",
  fetchUser,

  async (req, res) => {
    try {
      userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user)
      console.log(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

module.exports = router;
