const inquirer = require("inquirer");
const db = require("../config/connection");
const showMainMenu = require("../app.js");
const getValues = require("../helpers/get_values");
const continuePrompt = require("../helpers/cont_prompt");

// Function to view existing roles
module.exports.viewRoles = function viewRoles() {
  db.query("SELECT * FROM roles", (err, rows) => {
    if (err) throw err;
    console.log("\nROLES\n=====\n");
    console.table(rows);

    // option to restart
    inquirer.prompt(continuePrompt).then((answer) => {
      var choice = answer.continueOrQuit;
      if (choice === "Yes") {
        showMainMenu.showMainMenu();
      } else {
        process.exit();
      }
    });
  });
};

// Function to add new role
module.exports.addRole = function addRole() {
  let departmentChoices = [];
  departmentChoices = getValues.getValues("departments", "dept");
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
      // var dept = answers.dept;
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
        var choice = answer.continueOrQuit;
        if (choice === "Yes") {
          showMainMenu.showMainMenu();
        } else {
          process.exit();
        }
      });
    });
};
