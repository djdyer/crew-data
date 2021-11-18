const inquirer = require("inquirer");
const showMainMenu = require("../app.js");

// Last prompt to continue or quit
const continuePrompt = [
  {
    type: "list",
    message: "\nWould you like to continue?",
    choices: ["Yes", "No\n"],
    name: "continueOrQuit",
  },
];

// option to restart
function continueOrQuit() {
  inquirer.prompt(continuePrompt).then((answer) => {
    var choice = answer.continueOrQuit;
    if (choice === "Yes") {
      showMainMenu.showMainMenu();
    } else {
      console.log("\nCrew Data secure...\n\nGOODBYE\n");
      process.exit();
    }
  });
}

module.exports = continueOrQuit;
