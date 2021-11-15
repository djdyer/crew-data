const cTable = require("console.table");
const inquirer = require("inquirer");
const { viewDepts, addDept } = require("./scripts/departments");
const { viewRoles, addRole } = require("./scripts/roles");
const { viewEmployees, addEmployee } = require("./scripts/employees");

// Initialize
function showMainMenu() {
  console.log("\nWelcome to Crew Data\n====================\n");
  // MAIN MENU
  inquirer
    .prompt([
      {
        type: "list",
        message: "Make your selection below to get started:",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Edit/Filter",
          "Quit",
        ],
        name: "choice",
      },
    ])
    // Switch case with choice
    .then((answer) => {
      var choice = answer.choice;
      switch (choice) {
        case "View Departments":
          viewDepts();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDept();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Edit/Filter":
          moreOptions();
          break;
        default:
          process.exit();
          break;
      }
    });
}

// Function to update any employee
function moreOptions() {
  console.log(
    "figure out how to update an employee's manager. Filter employee by manager and department. Delete any department, role, or employee. View total utilized budget per department"

    // hint
    // select employees.first_name, roles.role_name, roles.salary from employees inner join roles on employees.role_id = roles.id
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
}

showMainMenu();

module.exports.showMainMenu = showMainMenu;
