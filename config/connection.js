const mysql = require("mysql2");

// mySQL connection created & established
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "crew_db",
  },
  console.log("Connected")
);
db.connect((err) => {
  if (err) throw err;
});

module.exports = db;
