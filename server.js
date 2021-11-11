const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
// const fs = require("fs");

// const schema = fs.readFileSync("./db/schema.sql", {
//   encoding: "utf-8",
// });
// const seeds = fs.readFileSync("./db/seeds.sql", {
//   encoding: "utf-8",
// });

// mySQL connection created & established
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "crew_db",
  },
  console.log("Connected")
);
db.connect((err) => {
  if (err) throw err;
  initInquire();
});

// db.query(schema, (err) => {
//   if (err) throw err;
// });

// db.query(seeds, (err) => {
//   if (err) throw err;
// });

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
      "Edit/Filter",
      "Quit",
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
      case "Edit/Filter":
        moreOptions();
        break;
      default:
        quit();
        // DOES NOT ACTUALLY QUIT APP
        break;
    }
  });
}

// Last prompt to continue or quit
const continuePrompt = [
  {
    type: "list",
    message: "\nWould you like to continue?",
    choices: ["Yes", "No"],
    name: "continueOrQuit",
  },
];

// Function to view all departments
function viewDepts() {
  db.query("SELECT * FROM departments ORDER BY id ASC", (err, rows) => {
    if (err) throw err;
    console.log("\nDEPARTMENTS\n===========\n");
    console.table(rows);
    inquirer.prompt(continuePrompt).then((answer) => {
      var choice = answer.choice;
      if ((choice = "Yes")) {
        initInquire();
      } else {
        quit();
      }
    });
  });
}

// Function to view existing roles
function viewRoles() {
  db.query("SELECT * FROM roles", (err, rows) => {
    if (err) throw err;
    console.log("\nROLES\n=====\n");
    console.table(rows);
    inquirer.prompt(continuePrompt).then((answer) => {
      var choice = answer.choice;
      if ((choice = "Yes")) {
        initInquire();
      } else {
        quit();
      }
    });
  });
}

// Function to view current employees
function viewEmployees() {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.role_name, roles.dept_id, roles.salary, employees.manager FROM employees JOIN roles ON employees.role_id = roles.id",
    (err, rows) => {
      if (err) throw err;
      console.log("\nEMPLOYEES\n=========\n");
      console.table(rows);
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
    console.log(dept + " has been added to the departments database.");
    // option to restart
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
    console.log(
      "\nThe " +
        role_name +
        " role has been added to the " +
        dept +
        " department, with a salary of $" +
        salary
    );
    // option to restart
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
    console.log(
      "\n" +
        first_name +
        " " +
        last_name +
        "has been added as a new " +
        role_name +
        " in the database"
    );
    // option to restart
  });
}

// Function to update any employee
function moreOptions() {
  console.log(
    "figure out how to update an employee's manager. Filter employee by manager and department. Delete any department, role, or employee. View total utilized budget per department"

    // hint
    // select employees.first_name, roles.role_name, roles.salary from employees inner join roles on employees.role_id = roles.id
  );
}

function quit() {
  console.log("figure out how to quit!");
}
