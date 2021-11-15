// Last prompt to continue or quit
const continuePrompt = [
  {
    type: "list",
    message: "\nWould you like to continue?",
    choices: ["Yes", "No"],
    name: "continueOrQuit",
  },
];

module.exports = continuePrompt;
