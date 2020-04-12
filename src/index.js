const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const HTML = require("./generatedHTML");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "color",
    message: "What's your favorite color ?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your Github username?",
  },
];

inquirer.prompt(questions).then((answers) => {
  let color = answers.color;
  let user = answers.github;

  const queryUrl = `https://api.github.com/users/${user}`;

  axios.get(queryUrl).then(function (res) {
    console.log(res);
  });
});

function writeToFile(fileName, data) {}

function init() {}

init();
