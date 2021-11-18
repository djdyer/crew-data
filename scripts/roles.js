const inquirer = require("inquirer");
const db = require("../config/connection");
const getValues = require("../helpers/get_values");
const continueOrQuit = require("../helpers/cont_prompt");

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
      continueOrQuit();
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
          continueOrQuit();
        }
      );
    });
};

// Function to delete any role
module.exports.deleteRole = function deleteRole() {
  let roleChoices = [];

  db.query("SELECT * FROM roles", function (err, result) {
    if (err) throw err;

    // iterate for all the rows in result
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      title = "role_name";
      roleChoices.push(row[title]);
    });

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which Role do you want to delete?",
          choices: roleChoices,
          name: "roles",
        },
      ])
      .then((answer) => {
        // converting role selection into id
        db.query(
          `SELECT id FROM roles WHERE role_name = "${answer.roles}"`,
          (err, delRole) => {
            const delId = delRole[0].id;

            // deletes dept from db
            db.query(`DELETE FROM roles WHERE id = ${delId}`, (err, delId) => {
              if (err) throw err;
            });
            // confirming department deleted
            console.log(
              "\n" +
                answer.roles +
                " has been deleted from the roles db " +
                "\n"
            );

            // option to restart
            continueOrQuit();
          }
        );
      });
  });
};
