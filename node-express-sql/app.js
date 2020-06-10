const express = require('express');
const mysql = require('mysql');

// Create connection with database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected!");
});

// Setup a simple express server
const app = express();

// Create database 
// Create a route (get request)
// app.get("/createDB", (req, res) => {
//     // Create query and insert it into a variable
//     let sql = "CREATE DATABASE nodemysql";
//     // To run the query: 
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("database created!");
//     });
// });
// 
// // Create table
// app.get("/createpoststable", (req, res) => {
//     let sql = "CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARy KEY(id))";
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Posts table created!');
//     });
// });

// Insert post 1
app.get("/addpost1", (req, res) => {
    let post = { title: "eat", body: "pending" };
    let sql = "INSERt INTO table_tasks SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added!');
    });
});
app.get("/addpost2", (req, res) => {
    let post = { title: "shower", body: "done" };
    let sql = "INSERt INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added!');
    });
});

// Select posts
app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Posts fetched!');
    });
});


// Arrow function will run after the service starts
app.listen("5000", () => {
    console.log("Server started on port 5000!");
});

//  Nodemon allows us to run the server without having to restart it everytime after a small change
