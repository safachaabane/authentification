
const express = require("express");
const connectDB = require("./config/connectDB");
const router = require("./routes/UserRouter");

const app = express();
app.use(express.json());

app.use('/auth',router)

require("dotenv").config({
  path: "./config/.env",
});




connectDB();









const PORT = process.env.PORT ||5000;
app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(
        `server is running on port ${PORT}`
      )
);


