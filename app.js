const cTable = require("console.table");
const inquirer = require("inquirer");
const { viewDepts, addDept, deleteDept } = require("./scripts/departments");
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
          "Filter Employee by Department",
          "Show Utilized Budget by Department",
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
          updateEmpMan();
          break;
        case "Filter Employees by Manager":
          filterByMan();
          break;
        case "Filter Employees by Department":
          filterByDept();
          break;
        case "Show Utilized Budget by Department":
          showBudget();
          break;
        default:
          process.exit();
      }
    });
}

showMainMenu();

module.exports.showMainMenu = showMainMenu;
