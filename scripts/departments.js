const inquirer = require("inquirer");
const db = require("db");

// Function to view existing departments
module.exports.viewDepts = function viewDepts() {
  db.query("SELECT * FROM departments ORDER BY id ASC", (err, rows) => {
    if (err) throw err;
    console.log("\nDEPARTMENTS\n===========\n");
    console.table(rows);
    // option to restart
    inquirer.prompt(continuePrompt).then((answer) => {
      var choice = answer.choice;
      if ((choice = "Yes")) {
        initInquire();
      } else {
        quit();
      }
    });
  });
};

module.exports.addDept = function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name?",
        name: "dept_name",
      },
    ])
    .then((answer) => {
      var dept = answer.dept_name;
      // confirmation dept added
      console.log(dept + " has been added to the departments database.\n");
      // adds new dept to db
      db.query(`INSERT INTO departments (dept_name) VALUES ("${dept}")`),
        (err, rows) => {
          if (err) throw err;
        };
      // option to restart
      inquirer.prompt(continuePrompt).then((answer) => {
        var choice = answer.choice;
        if ((choice = "Yes")) {
          initInquire();
        } else {
          quit();
        }
      });
    });
};
