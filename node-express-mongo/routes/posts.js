// We import express and call the router method
// We create our own routes into separate files and import it into app.js
// We use the router to create our routes instead of the app.js

const express = require("express");
const router = express.Router();

// Adding a post to the database --> first we import the model
const Post = require("../models/Post");

// We do not need posts as a paramater here anymore,
// everytime we go to /posts, the post routes in app.js are going to run
// we do not have to worry about adding the /posts/specific parameters here,
// we always know that in the post route (i.e. whatever we have in the app.js)
// the get function is always going to bring us to the posts (contained in the app.js)
// we can attach more posts, we can do so by attaching them to the posts route
// router.get("/", (req, res) => {
//   res.send("We are at posts");
// });

// Adding a post to the database --> once we send the post via POSTMAN
// we get undefined (we cannot process the request that is coming in within the request body)
// we need an special method that converts the req.body to json
// urlencoded method (parses our request and returns a correct way to handle the data)
// save the post to the database --> save() returns a promise
router.post("/", async (req, res) => {
  const post = new Post({
    todoText: req.body.todoText,
    todoStatus: req.body.todoStatus
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// If we want to add more, we can add a specific post:
// router.get("/specific", (req, res) => {
//   res.send("Specific Posts");
// });

// We export the router
// We can configure this to have a post router, a users router etc
module.exports = router;

// Summary
// We create a route, export the router and import it into the app.js
// using it as a middleware
