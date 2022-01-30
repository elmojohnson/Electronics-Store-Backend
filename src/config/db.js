// Inmports
require("dotenv").config();
const mongoose = require("mongoose");

// Variables
const CONNECTION = process.env.MONGO_DB;

mongoose.connect(CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db
