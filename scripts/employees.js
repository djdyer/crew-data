const inquirer = require("inquirer");
const db = require("../config/connection");
const showMainMenu = require("../app.js");
const getValues = require("../helpers/get_values");
const continuePrompt = require("../helpers/cont_prompt");

// Function to view current employees
module.exports.viewEmployees = function viewEmployees() {
  db.query(
    `SELECT emp.id, emp.first_name, emp.last_name, roles.role_name, departments.dept_name, roles.salary, CONCAT(man.first_name, " ", man.last_name) AS manager
  FROM employees emp
  LEFT JOIN roles ON emp.role_id = roles.id
  LEFT JOIN departments ON roles.dept_id = departments.id
  LEFT JOIN employees man ON emp.manager = man.id ORDER BY id ASC`,
    (err, rows) => {
      if (err) throw err;
      // displays all existing employees by id, first-last name, role, department, manager, salary
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
  roleChoices = getValues.getValues("roles", "role");

  let managerChoices = [];
  // db.query(
  //   `SELECT CONCAT(first_name, " ",last_name) AS manager FROM employees`
  // ),
  //   (err, managers) => {
  //     managerChoices.push(...managers);
  //     console.log(managerChoices);
  //     if (err) throw err;
  //   };

  // let managerChoices;
  // db.query(
  //   `SELECT CONCAT(first_name, " ",last_name) AS manager FROM employees`
  // ),
  //   (err, managers) => {
  //     managerChoices = managers.map((manager) => {
  //       return manager.first_name + " " + manager.last_name;
  //     });
  //     console.log(managerChoices);
  //     if (err) throw err;
  //   };

  managerChoices = getValues.getValues("employees", "first", "last");
  // managerLast = getValues.getValues("employees", "last");
  // managerChoices = managerFirst + " " + managerLast;

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
      {
        type: "list",
        message: "Who is the employees manager?",
        choices: managerChoices,
        // choices: [1, 2, 3],
        name: "manager_name",
      },
    ])

    .then((answers) => {
      var first_name = answers.first_name;
      var last_name = answers.last_name;
      var role_name = answers.role_name;
      var manager = answers.manager_name;

      // Converting role name to role id
      db.query(
        `SELECT id FROM roles WHERE role_name = "${answers.role_name}"`,
        (err, roleId) => {
          const role = roleId[0].id;

          // Converting manager assignment into employee id
          db.query(
            `SELECT id FROM employees WHERE first_name = "${answers.manager_name}"`,
            (err, employeeId) => {
              const id = employeeId[0].id;

              // adds new employee to db
              db.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("${first_name}", "${last_name}", "${role}", "${id}")`
              ),
                (err, employeeId) => {
                  if (err) throw err;
                };
            }
          );
        }
      );

      // confirming employee added to db
      console.log(
        "\n" +
          first_name +
          " " +
          last_name +
          "has been added as a new " +
          role_name +
          " supervised by " +
          manager +
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
