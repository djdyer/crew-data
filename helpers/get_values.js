const db = require("../config/connection");
const cTable = require("console.table");

module.exports.getValues = function getValues(table, name) {
  let results = [];
  db.query("SELECT * FROM " + table, function (err, result, fields) {
    if (err) throw err;
    // iterate for all the rows in result
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      title = name + "_name";
      results.push(row[title]);
    });
  });
  return results;
};
