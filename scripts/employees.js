const inquirer = require("inquirer");
const db = require("../config/connection");
const continueOrQuit = require("../helpers/cont_prompt");
const getValues = require("../helpers/get_values");
const getManager = require("../helpers/get_values");

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
      continueOrQuit();
    }
  );
};

// Function to add new employee
module.exports.addEmployee = function addEmployee() {
  let roleChoices = [];
  roleChoices = getValues.getValues("roles", "role");

  let managerChoices = [];
  managerChoices = getManager.getManager();

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
            `SELECT id FROM employees WHERE first_name = "${
              answers.manager_name.split(" ")[0]
            }"`,
            (err, employeeId) => {
              const id = employeeId[0].id;

              // adds new employee to db
              db.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("${first_name}", "${last_name}", "${role}", "${id}")`
              ),
                (err, employeeId) => {
                  if (err) throw err;
                };
              // confirming employee added to db
              console.log(
                "\n" +
                  first_name +
                  " " +
                  last_name +
                  " has been added as a new " +
                  role_name +
                  ", supervised by " +
                  manager +
                  "\n"
              );

              // option to restart
              continueOrQuit();
            }
          );
        }
      );
    });
};

// Function to delete any employee
module.exports.deleteEmployee = function deleteEmployee() {
  let employeeChoices = [];

  db.query(
    `SELECT CONCAT(first_name, " ",last_name) AS employees FROM employees`,
    function (err, result) {
      if (err) throw err;

      // iterate for all the rows in result
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        title = "employees";
        employeeChoices.push(row[title]);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which Employee do you want to delete?",
            choices: employeeChoices,
            name: "employee",
          },
        ])
        .then((answer) => {
          // converting role selection into id
          db.query(
            `SELECT id FROM employees WHERE first_name = "${
              answer.employee.split(" ")[0]
            }"`,
            (err, delEmployee) => {
              const delId = delEmployee[0].id;

              // deletes employee from db
              db.query(
                `DELETE FROM employees WHERE id = ${delId}`,
                (err, delId) => {
                  if (err) throw err;
                }
              );
              // confirming department deleted
              console.log(
                "\n" +
                  answer.employee +
                  " has been deleted from the employees db " +
                  "\n"
              );

              // option to restart
              continueOrQuit();
            }
          );
        });
    }
  );
};
