const cTable = require("console.table");
const inquirer = require("inquirer");
const { viewDepts, addDept, deleteDept } = require("./scripts/departments");
const { viewRoles, addRole, deleteRole } = require("./scripts/roles");
const {
  viewEmployees,
  addEmployee,
  deleteEmployee,
} = require("./scripts/employees");

// Initialize
function showMainMenu() {
  console.log("\nWELCOME TO CREW DATA\n====================\n");
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
      }
    });
}

// Function for MORE menu
function moreOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "\nWhat else would you like to do?",
        choices: [
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "Update Employee Manager",
          "Filter Employees by Manager",
          "Filter Employees by Department",
          "Show Utilized Budget per Department",
          "Quit",
        ],
        name: "choice",
      },
    ])
    // Switch case with choice
    .then((answer) => {
      var choice = answer.choice;
      switch (choice) {
        case "Delete Department":
          deleteDept();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Update Employee by Manager":
          updateEmpoyeeManager();
          break;
        case "Filter Employees by Manager":
          filterEmployeeByManager();
          break;
        case "Filter Employees by Department":
          filterEmployeeByDept();
          break;
        case "Show Utilized Budget by Department":
          showUtilizedBudget();
          break;
        default:
          console.log("\nCrew Data secure...\n\nGOODBYE\n");
          process.exit();
      }
    });
}

showMainMenu();

module.exports.showMainMenu = showMainMenu;
module.exports.moreOptions = moreOptions;
