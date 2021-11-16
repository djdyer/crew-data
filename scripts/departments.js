const inquirer = require("inquirer");
const db = require("../config/connection");
const showMainMenu = require("../app.js");
const getValues = require("../helpers/get_values");
const continuePrompt = require("../helpers/cont_prompt");

// Function to view existing departments
module.exports.viewDepts = function viewDepts() {
  db.query("SELECT * FROM departments ORDER BY id ASC", (err, rows) => {
    console.log("\nDEPARTMENTS\n===========\n");
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
      // confirmation dept added
      console.log(dept + " has been added to the departments database.\n");
      // adds new dept to db
      db.query(`INSERT INTO departments (dept_name) VALUES ("${dept}")`),
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

module.exports.deleteDept = function deleteDept() {
  let departmentChoices = [];
  // departmentChoices = getValues.getValues("departments", "dept");

  db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    const deleteId = rows[0].id;
    console.log(deleteId);
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
      console.log(departmentChoices, "TEST");
      console.log(answer.dept);

      var deleteDept = answer.dept;

      // confirming department deleted
      console.log(
        "\n" + deleteDept + " has been deleted from the departments db " + "\n"
      );

      // Converting department selection into id
      db.query(
        `SELECT id FROM departments WHERE dept_name = "${answer.dept}"`,
        (err, delDept) => {
          const delId = delDept[0].id;

          // deletes dept from db
          db.query(`DELETE FROM departments WHERE id = ${delId}`),
            (err, delId) => {
              if (err) throw err;
            };
        }
      );

      // option to restart
      inquirer.prompt(continuePrompt).then((answer) => {
        var choice = answer.choice;
        if (choice === "Yes") {
          showMainMenu();
        } else {
          process.exit();
        }
      });
    });
};
