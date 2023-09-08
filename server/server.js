const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql');
// Middleware
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Krysta0988550999!!",
    port: 3306
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

app.listen(5002, ()=>{
    console.log("Server has started on port 5002");
});
