const inquirer = require("inquirer");
const db = require("db");

// Function to view existing roles
module.exports.viewRoles = function viewRoles() {
  db.query("SELECT * FROM roles", (err, rows) => {
    if (err) throw err;
    console.log("\nROLES\n=====\n");
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

// Function to provide new results in inquiry choices
function getValues(table, name) {
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
}

// Function to add new role
module.exports.addRole = function addRole() {
  let departmentChoices = [];
  departmentChoices = getValues("departments", "dept");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the job title?",
        name: "role_name",
      },
      {
        type: "list",
        message: "This role is in what department?",
        choices: departmentChoices,
        name: "dept",
      },
      {
        type: "input",
        message: "What is salary for this position?",
        name: "salary",
      },
    ])
    .then((answers) => {
      var role_name = answers.role_name;

      // DO I REALLY NEED THIS SWITCH CASE FOR DEPT? / changing string to int
      switch (answers.dept) {
        case "Reception":
          dept = 1;
          break;
        case "Human Resources":
          dept = 2;
          break;
        case "Management":
          dept = 3;
          break;
        case "Design":
          dept = 4;
          break;
        case "Production":
          dept = 5;
          break;
        case "Marketing":
          dept = 6;
          break;
        case "Sales":
          dept = 7;
          break;
        default:
          dept = 8;
          break;
      }
      var salary = answers.salary;

      // confirming role added to db
      console.log(
        "\nThe " +
          role_name +
          " role has been added to the " +
          answers.dept +
          " department, with a salary of $" +
          salary +
          "\n"
      );

      // adds new role to db
      db.query(
        `INSERT INTO roles (role_name, dept_id, salary) VALUES ("${role_name}", "${dept}", "${salary}")`
      ),
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
