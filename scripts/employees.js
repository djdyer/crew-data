const inquirer = require("inquirer");
const db = require("../config/connection");
const showMainMenu = require("../app.js");
const getValues = require("../helpers/get_values");
const continuePrompt = require("../helpers/cont_prompt");

// Function to view current employees
module.exports.viewEmployees = function viewEmployees() {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.role_name, roles.dept_id, roles.salary, employees.manager FROM employees JOIN roles ON employees.role_id = roles.id",
    (err, rows) => {
      if (err) throw err;
      console.log("\nEMPLOYEES\n=========\n");
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

// Function to add new employee
module.exports.addEmployee = function addEmployee() {
  let roleChoices = [];
  roleChoices = getValues.getValues("roles", "role_name");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employees job title?",
        choices: roleChoices,
        name: "role_name",
      },
      // NEEDS TO AUTOMATICALLY KNOW DEPT / SALARY / MANAGER FOR EACH ROLE!!
      // {
      //   type: "input",
      //   message: "The role is in which department?",
      //   name: "dept",
      // },
      // {
      //   type: "input",
      //   message: "What is salary for this position?",
      //   name: "salary",
      // },
      // {
      //   type: "input",
      //   message: "Who is this role's direct manager?",
      //   name: "manager",
      // },
    ])
    .then((answers) => {
      var first_name = answers.first_name;
      var last_name = answers.last_name;
      var role_name = answers.role_name;
      // var dept = answers.dept;
      // var salary = answers.salary;
      // var manager = answers.manager;
      console.log(
        "\n" +
          first_name +
          " " +
          last_name +
          "has been added as a new " +
          role_name +
          " in the database\n"
      );

      // adds new employee to db
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("${first_name}", "${last_name}", "${salary}")`
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
