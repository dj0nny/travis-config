const yaml = require('js-yaml');
const inquirer = require('inquirer');

const fs = require('fs');
const path = require('path');

const existingconfig = fs.existsSync('.travis.yml');

if (existingconfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: '.travis.yml alredy exists! Do you want of overwrite it?',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        console.log('overwrite');
      } else {
        process.exit(0);
      }
    });
}
// try {
//   const travisFile = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), '.travis.yml'), 'utf8'));
//   console.log(travisFile);
// } catch (e) {
//   console.log(e);
// }
