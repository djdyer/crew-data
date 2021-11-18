const inquirer = require("inquirer");
const db = require("../config/connection");
const continueOrQuit = require("../helpers/cont_prompt");

// Function to view departments
module.exports.viewDepts = function viewDepts() {
  db.query("SELECT * FROM departments ORDER BY id ASC", (err, rows) => {
    // displays all existing departments by id and name
    console.log("\nDEPARTMENTS\n===========\n");
    console.table(rows);
    continueOrQuit();
  });
};

// Function to add a new department
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

      // adds new dept to db
      db.query(`INSERT INTO departments (dept_name) VALUES ("${dept}")`),
        (err, rows) => {
          if (err) throw err;
        };
      // confirmation dept added
      console.log(
        "\n" + dept + " has been added to the departments database.\n"
      );

      // option to restart
      continueOrQuit();
    });
};

// Function to delete any department
module.exports.deleteDept = function deleteDept() {
  let departmentChoices = [];

  db.query("SELECT * FROM departments", function (err, result) {
    if (err) throw err;

    // iterate for all the rows in result
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      title = "dept_name";
      departmentChoices.push(row[title]);
    });

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which Department do you want to delete?",
          choices: departmentChoices,
          name: "dept",
        },
      ])
      .then((answer) => {
        // converting department selection into id
        db.query(
          `SELECT id FROM departments WHERE dept_name = "${answer.dept}"`,
          (err, delDept) => {
            const delId = delDept[0].id;

            // deletes dept from db
            db.query(
              `DELETE FROM departments WHERE id = ${delId}`,
              (err, delId) => {
                if (err) throw err;

                // confirming department deleted
                console.log(
                  "\n" +
                    answer.dept +
                    " has been deleted from the departments db " +
                    "\n"
                );
                // option to restart
                continueOrQuit();
              }
            );
          }
        );
      });
  });
};
