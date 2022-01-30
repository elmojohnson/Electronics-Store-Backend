require("dotenv").config();
const express = require("express");
const app = express();
const bp = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT;
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

// Routes
const UserRoute = require("./routes/User");
const ItemRoute = require("./routes/Item");
const bodyParser = require("body-parser");

app.use("/user", UserRoute);
app.use("/item", ItemRoute);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));