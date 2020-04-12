const inquirer = require("inquirer");

const questions = [
    {
        type: 'input',
        name: 'color',
        message: "What's your favorite color ?",
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your Github username?'
    }
];

inquirer.prompt(questions).then(answers => {
  
} );

function writeToFile(fileName, data) {
 
}

function init() {

init();
