const inquirer = require("inquirer");
const fs = require("fs");

const prompts = [
  {
    type: "input",
    message: "___",
    name: "___",
  },
  {
    type: "number",
    message: "___",
    name: "___",
  },
  {
    type: "input",
    message: "___",
    name: "___",
  },
  {
    type: "input",
    message: "___",
    name: "___",
  },
  {
    type: "list",
    message: "___",
    choices: ["___", "___", "___", "___"],
    name: "___",
  },
];

function inquirer() {
  inquirer.prompt(___).then((answers) => {
    var ___ = new Engineer(answers.___, answers.___, answers.___, answers.___);
    team.push(___);
    switch (answers.___) {
      case "___":
        inquirer___();
        break;
      case "___":
        inquirer___();
        break;
      case "___":
        inquirer___();
        break;
      case "Finished":
        //   do something();
        break;
    }
  });
}
