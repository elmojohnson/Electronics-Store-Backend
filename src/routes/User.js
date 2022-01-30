const express = require("express");
const router = express.Router();
const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const authToken = require("../config/authToken");
const User = require("../models/User");

// Generate access token
const genToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
};

// Check if user exist
const isUserExist = async (username) => {
  const user = await User.findOne({ username: username }).exec();
  return user;
};

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  isUserExist(username).then((user) => {
    if (user) {
      if (bc.compareSync(password, user.password)) {
        res.status(200).json({
          error: false,
          msg: "Logged in",
          token: genToken(user.username),
          username: user.username,
          role: user.role
        });
      } else {
        res.status(200).json({
          error: true,
          msg: "Password is incorrect",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        msg: "Account does not exist",
      });
    }
  });
});

// Register
router.post("/register", (req, res) => {
  const { name, username, password } = req.body;

  isUserExist(username).then((isExist) => {
    if (isExist) {
      res.status(200).json({
        error: true,
        msg: "Username is already in use. Please create a new one.",
      });
    } else {
      const newUser = new User({
        name,
        username,
        password: bc.hashSync(password, 10),
      });
      newUser.save((error, result) => {
        if (error) throw error;
        res.status(200).json({
          error: false,
          msg: "Account created",
          token: genToken(username),
          username: result.username,
          role: result.role
        });
      });
    }
  });
});

// User account info
router.get("/account", authToken, async (req, res) => {
    const {id} = req.query;
    const user = await User.findById(id).exec();
    
    if(user) {
        res.status(200).json({name: user.name, username: user.username, joined_last: user.createdAt})
    } else {
        res.status(500).json({error: true, msg: "Account does not exist."})
    }
});

module.exports = router;
