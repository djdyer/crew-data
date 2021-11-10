const inquirer = require("inquirer");
const fs = require("fs");

// First prompt gives full menu of options
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
// Init function launches secondary, per switch case answer
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

// Function to view all departments
function viewDepts() {
  console.log("SELECT * FROM departments;");
}

// Function to view existing roles
function viewRoles() {
  console.log("SELECT * FROM roles;");
}

// Function to view current employees
function viewEmployees() {
  console.log("SELECT * FROM employees;");
}

// Asks only for department name
const addDeptPrompt = [
  {
    type: "input",
    message: "What is the department name?",
    name: "dept_name",
  },
];
// Function to add new department
function addDept() {
  inquirer.prompt(addDeptPrompt).then((answer) => {
    var dept = answer.dept_name;
    console.log(dept);
  });
}

// Asks for job title, department, and salary for position
const addRolePrompts = [
  {
    type: "input",
    message: "What is the job title?",
    name: "role_name",
  },
  {
    type: "input",
    message: "This role is in what department?",
    choice: [
      "Reception",
      "Human Resources",
      "Management",
      "Design",
      "Production",
      "Marketing",
      "Sales",
      "Warehouse",
    ],
    name: "dept",
  },
  {
    type: "input",
    message: "What is salary for this position?",
    name: "salary",
  },
];
// Function to add new role
function addRoles() {
  inquirer.prompt(addRolePrompts).then((answers) => {
    var role_name = answers.role_name;
    var dept = answers.dept;
    var salary = answers.salary;
    console.log(role_name);
    console.log(dept);
    console.log(salary);
  });
}

// Asks for new employee's first name, last name, job title,
const addEmployeePrompts = [
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
];
// Function to add new employee
function addEmployee() {
  inquirer.prompt(addEmployeePrompts).then((answers) => {
    var first_name = answers.first_name;
    var last_name = answers.last_name;
    var role_name = answers.role_name;
    // var dept = answers.dept;
    // var salary = answers.salary;
    // var manager = answers.
    console.log(first_name);
    console.log(last_name);
    console.log(role_name);
  });
}

// Function to update any employee
function updateEmployee() {
  console.log("figure out how to update an employees info!");
}

initInquire();
