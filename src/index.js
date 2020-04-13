const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const hTMLToPdf = require("html-pdf");
const config = { format: "A4" };
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

inquirer.prompt(questions).then(({ github, color }) => {
  const queryUrl = `https://api.github.com/users/${github}`;

  axios.get(queryUrl).then(function (res) {
    console.log(res.data);

    data = {
      color: color,
      profilePic: res.data.avatar_url,
      name: res.data.login,
      location: res.data.location,
      profileUrl: res.data.html_url,
      blog: res.data.blog,
      bio: res.data.bio,
      company: res.data.company,
      repos: res.data.public_repos,
      followers: res.data.followers,
      following: res.data.following,
    };

    axios
      .get(`https://api.github.com/users/${github}/repos`)
      .then(function (res) {
        // console.log(res);
        let starCount = 0;
        for (let index = 0; index < res.data.length; index++) {
          count = res.data[index].stargazers_count;
          starCount = starCount + count;
        }
        data.starCount = starCount;

        hTMLToPdf
          .create(HTML(data, config))
          .toFile("./profile.pdf", function (err, res) {
            if (err) {
              throw err;
            }

            let htmlData = HTML(data);

            writeFileAsync("index.html", htmlData);
          });
      });
  });
});

//
