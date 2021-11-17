const db = require("../config/connection");

module.exports.getValues = function getValues(table, name) {
  let results = [];
  // console.log("start GetValues(): table: " + table + " name: " + name);
  db.query("SELECT * FROM " + table, function (err, result) {
    if (err) throw err;

    // iterate for all the rows in result
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      title = name + "_name";
      results.push(row[title]);
    });
  });
  // console.log("end GetValues(): results: " + results);
  return results;
};
