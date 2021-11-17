const inquirer = require("inquirer");
const db = require("../config/connection");
const showMainMenu = require("../app.js");
const getValues = require("../helpers/get_values");
const continuePrompt = require("../helpers/cont_prompt");

// Function to view roles
module.exports.viewRoles = function viewRoles() {
  db.query(
    "SELECT roles.id, roles.role_name, departments.dept_name, roles.salary FROM roles JOIN departments ON roles.dept_id = departments.id ORDER BY id ASC",
    (err, rows) => {
      if (err) throw err;
      // displays all existing roles by id, role name, department name and salary
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
    }
  );
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
      var dept = answers.dept;
      var salary = answers.salary;

      // Converting department assignment into integer
      db.query(
        `SELECT id FROM departments WHERE dept_name = "${answers.dept}"`,
        (err, deptIds) => {
          const id = deptIds[0].id;

          // adds new role to db
          db.query(
            `INSERT INTO roles (role_name, dept_id, salary) VALUES ("${role_name}", "${id}", "${salary}")`
          ),
            (err, deptIds) => {
              if (err) throw err;
            };
        }
      );

      // confirming role added to db
      console.log(
        "\nThe " +
          role_name +
          " role has been added to the " +
          dept +
          " department, with a salary of $" +
          salary +
          "\n"
      );

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
