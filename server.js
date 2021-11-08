const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Starts server listening on port var
app.listen(PORT, () => console.log(`Listening on port ${PORT}...🚀`));
