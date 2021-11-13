const inquirer = require("inquirer");
const db = require("db");

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
        var choice = answer.choice;
        if ((choice = "Yes")) {
          initInquire();
        } else {
          quit();
        }
      });
    }
  );
};

// Function to provide new results in inquiry choices
// function getValues(table, name) {
//     let results = [];
//     db.query("SELECT * FROM " + table, function (err, result, fields) {
//       if (err) throw err;

//       // iterate for all the rows in result
//       Object.keys(result).forEach(function (key) {
//         var row = result[key];
//         title = name + "_name";
//         results.push(row[title]);
//       });
//     });
//     return results;
//   }

// Function to add new employee
module.exports.addEmployee = function addEmployee() {
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
        choices: [
          "Receptionist",
          "HR Manager",
          "General Manager",
          "Assistant Manager",
          "Associate",
          "Intern",
          "Art Director",
          "Designer",
          "Production Coordinator",
          "Production Assistant",
          "Marketing Director",
          "Social Media Coordinator",
          "Head of Sales",
          "Sales Manager",
          "Warehouse Manager",
          "Warehouse Clerk",
        ],
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
        var choice = answer.choice;
        if ((choice = "Yes")) {
          initInquire();
        } else {
          quit();
        }
      });
    });
};
