const inquirer = require('inquirer');

const rubyConfig = require('../config/rubyConfig');

async function rubyBuild() {
  const answers = await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'version',
        message: 'Select the rmv version',
        choices: [
          '2.0.0',
          '1.9.3',
          '1.8.7',
          'rbx-19mode',
        ],
      },
    ]);
  rubyConfig.rvm = answers.version;
  return {
    ...rubyConfig,
  };
}

module.exports = rubyBuild;
