const inquirer = require("inquirer");
const fs = require("fs");

const initPrompt = [
  {
    type: "list",
    message:
      "Welcome to Crew Data\n======================\nMake your selection below to get started:",
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
  inquirer.prompt(initPrompt).then((answers) => {
    var choice = answers.choice;
    console.log(choice);
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
      case "Update Department":
        updateDept();
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

function updateDept() {
  console.log("figure out how to update an employees info!");
}

initInquire();
