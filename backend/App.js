// Imports
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/routes");
const sequelize = require("./util/database");
require("dotenv").config();

app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode > 400;
    },
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set response headers
  res.header("Access-Control-Allow-Origin", "*"); // Allow access to any (*) site
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  ); // We set which kind of headers we want to accept

  // Set available request methods
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next(); // Go to next middleware
});

app.use("/", routes);

//test route
app.get("/", (req, res, next) => {
  res.send("Hello World");
});

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//sync database
sequelize
  .sync()
  .then((result) => {
    console.log("Database connected");
    app.listen(process.env.SERVER_PORT);
  })
  .catch((err) => console.log(err));

module.exports = app;
