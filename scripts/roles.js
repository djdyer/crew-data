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
      var dept = answers.dept;
      var salary = answers.salary;

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

      let id = [];

      db.query(`SELECT dept_id FROM departments`, (err, deptIds) => {
        if (err) throw err;
        console.table(deptIds);
        const id = deptIds;

        // adds new role to db
        db.query(
          `INSERT INTO roles (role_name, dept_id, salary) VALUES ("${role_name}", "${id}", "${salary}")`
        ),
          (err, deptIds) => {
            if (err) throw err;
          };
      });

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
