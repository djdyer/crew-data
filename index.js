const inquirer = require("inquirer");
const fs = require("fs");

const initPrompt = [
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
      "Update Employee",
    ],
    name: "choice",
  },
];

function initInquire() {
  console.log("\nWelcome to Crew Data\n====================\n");
  inquirer.prompt(initPrompt).then((answer) => {
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
        addRoles();
        break;
      case "Add Employee":
        addEmployee();
        break;
      default:
        updateEmployee();
        break;
    }
  });
}

function viewDepts() {
  console.log("figure out how to show departments!");
}

function viewRoles() {
  console.log("figure out how to show all the roles!");
}

function viewEmployees() {
  console.log("figure out how to show all the employees!");
}

function addDept() {
  console.log("figure out how to add a Dept!");
}

function addRoles() {
  console.log("figure out how to add a role!");
}

function addEmployee() {
  console.log("figure out how to add an employee!");
}

function updateEmployee() {
  console.log("figure out how to update an employees info!");
}

initInquire();
