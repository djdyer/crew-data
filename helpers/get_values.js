const db = require("../config/connection");

module.exports.getValues = function getValues(table, name) {
  let results = [];
  db.query("SELECT * FROM " + table, function (err, result) {
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

// module.exports.getManager = function getManager() {
//   let results = [];
//   db.query(
//     `SELECT CONCAT(first_name, " ",last_name) AS manager FROM employees`,
//     function (err, rows) {
//       if (err) {
//         console.log("err: " + err);
//         throw err;
//       }
//       console.log(rows);

//       for (var i = 0; rows.length < 0; i++) {
//       results.push(rows[i]);
//       }

//       results.push(rows[0].manager);
//       console.log(results);
//     }
//   );
//   return results;
// };
