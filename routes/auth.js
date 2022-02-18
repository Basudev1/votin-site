var express = require("express");
const res = require("express/lib/response");
var router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

/* Login Endpoint */
/* Auth Section */
router.post("/login", async (req, res, next) => {
  const { email } = req.body;

  console.log(email);
  if (!email) {
    res.status(400).json({ error: "Email or password is missing" });
  } else {
    // res.status(200).json({ email, password });
    //Login Function will be here
    // try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Something Went wrong" });
    } else {
      // console.log(user);
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (user && isMatch) {
      if (user) {
        //compare the password with the hash

        //After username and pass match function
        const adminUser = user.isAdmin;

        const data = {
          user: {
            id: user.id,
            email: user.email,
            isAdmin: adminUser ? user.isAdmin : false,
          },
        };
        // }

        // console.log(data);
        // console.log(JWT_SECRET);
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ success: "true", token: authtoken });
      } else {
        res
          .status(400)
          .json({ error: "Something went wrong, Please try again" });
      }
      // } catch (error) {
      //   res.status(400).json({ error: "Something went wrong, Please try again" });
      // }
    }
  }
});

//Signup Endpoint

router.post("/signup", async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email is missing or Does not exists" });
  } else {
    //check if email already exists

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      // const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        email: email,
      });
      const data = {
        user: {
          id: user.id,
          email: user.email,
        },
      };
      let success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Something Went Wrong" });
    }

    // res.status(200).json({ username, email, password, cpassword });
  }
});

module.exports = router;
