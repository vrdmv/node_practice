// Create a simple express server
const express = require('express');
const app = express();
const logger = require("./middleware/logger")


// Middleware functions have access to the req/response objects, allowing us to change/add certain elements
// next should always be called last, so that we move to the next middleware function
// Here we are going to log the url that's hit + the date
// We have access to certain parts of the URL with the request object
// See logger.js

// In order to initialize the middleware, we use the .use method
// Everytime we make a request, the middleware above is going to run
// We can execute anything in the function's body and we have access to the 
// request and response objects within the function
// app.use(logger);

// Body parser middleware initialization
// express.json allows us to handle raw json
// to handle url encoded data, i.e. form submissions, we use the .urlencoded() method 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To use the router, pass the parent route and the routes file we created: 
// Users API routes
app.use('/api/users', require("./routes/users"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

