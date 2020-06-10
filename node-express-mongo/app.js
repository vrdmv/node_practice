// We import the package
const express = require("express");

// We execute the package
const app = express();

// We import the mongoose package
const mongoose = require("mongoose");

// We create a middleware (anytime we hit any request, we make sure the body-parser runs)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Once we require the dotenv package, we have access to the database connection
require("dotenv/config");

// Import routes
const postsRoute = require("./routes/posts");

// We create the middleware, i.e. everytime we go to the posts, make sure to use this posts route
app.use("/posts", postsRoute);

// We can have multiple middlewares, i.e.:
// app.use("/user", userRoute);

// Middlewares
// function that executes when routes are being hit
// i.e. add some logic to run everytime we hit the post
// e.g. can check if a user is authenticated
// app.use("/posts", () => {
//   console.log("This is a middleware running");
// });

// We create ROUTES
// "get" means that we receive back a message/information
// to send a message (like a login form), we use "post"
// to delete a certain post, we use "delete"
// to update information (i.e. a post) we use "patch"
// the first paramether of the given method (get, post, delete, patch) is
// is the route that we want to go to ('/' is localhost)
// app.get("/", (req, res) => {
//   res.send("We are at home");
// });
//
// app.get("/posts", (req, res) => {
//   res.send("We are at posts");
// });

// Connect to the database
mongoose.connect(process.env.DB_Connection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to database!"))
  .catch(err => {
    console.log("Connection error", err.message);
  });

// How do we start listening / boot up the server?
// Paramater is the channel
app.listen(3000);
