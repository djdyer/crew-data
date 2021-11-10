const express = require("express");
const mysql = require("mysql");
// const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE crew_db";
  db.query(sql, (err) => {
    if (err) throw err;
    res.send("Database Created");
  });
});

db.query("SELECT * FROM departments", (err, rows) => {
  if (err) throw err;
  console.log("DEPARTMENTS\n===========\n");
  console.log(rows);
});

// Starts server listening on port var
app.listen(PORT, () => console.log(`Listening on port ${PORT}...🚀`));
