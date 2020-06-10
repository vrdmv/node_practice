// We can use the express router to put all of our similar routes in a single file
// We create a routes folder, and in the routes folde we create an api folder 
// Not all routes can be APIs (serving JSON), we may have routes serving templates
// In order to use the express router:
const express = require("express");
const router = express.Router();
const users = require("../users");
// When using the router to handle our request, we apply the .get() to the router variable
// Since we have the route /api/users in the index app.use() function, we do not need the routes here

// Create a route to handle get requests (i.e. when a client goes to a page, server receives a get request)
// Arrow (callback) function used
// With every route we create, we have access to the response and request objects  
// Simple REST API that returns the entire users array in JSON when we hit the route (with react, vue, angular or POSTMAN):
router.get('/', (req, res) => {
    //res object has a send method, which  responds to the browser 
    // res.send("Hello World")
    res.json(users);
});

// Return a single user upon receipt of a GET request 
// We get a member by :id (URL paramater) and we use the request object
// to grab whatever is in the URL
router.get("/:id", (req, res) => {
    // If there is no member under the requested id:
    // Checking to see if user exists - some() method runs the condition and 
    // returns true / false to the variable
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        // req.params.id (we get any paramater passed in the URL)
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ message: `User number ${req.params.id} not found!` });
    }
});


// Create user
// When we receive the data being sent, it is contained in the request object
// We need to use a body parser to parse the data we are sending in the body
// We initialize the body parser as a middleware in index.js
router.post("/", (req, res) => {
    // here our http response sends back the body of the http request
    // res.send(req.body);
    const newUser = {
        id: 4,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // we want to add the new number to our array
    // we need to check that the name and email are properly sent (i.e. not empty)
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ message: "Please include a name and email" });
    }

    users.push(newUser);
    res.json(users);
});

// Update user 
router.put("/:id", (req, res) => {
    // If there is no member under the requested id:
    // Checking to see if user exists - some() method runs the condition and 
    // returns true / false to the variable
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        const UpdateUser = req.body;
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = UpdateUser.name ? UpdateUser.name : user.name;
                user.email = UpdateUser.email ? UpdateUser.email : user.email;

                res.json({ message: "User was updated", user });
            }
        });
    } else {
        res.status(400).json({ message: `User number ${req.params.id} not found!` });
    }
});


// Delete user
router.delete("/:id", (req, res) => {
    // If there is no member under the requested id:
    // Checking to see if user exists - some() method runs the condition and 
    // returns true / false to the variable
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json({
            message: "User deleted",
            users: users.filter(user => user.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ message: `User number ${req.params.id} not found!` });
    }
});




module.exports = router;