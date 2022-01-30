const express = require("express");
const authToken = require("../config/authToken");
const router = express.Router();

// Show order history by the user
router.get("/", authToken, (req, res) => {
    
})

module.exports = router;