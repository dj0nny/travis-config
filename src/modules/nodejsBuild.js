const inquirer = require('inquirer');
const nodejsConfig = require('../config/nodejsConfig');

async function nodejsBuild() {
  const answers = await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'version',
        message: 'Select the node.js version',
        choices: [
          '8',
          '9',
          '10',
        ],
      },
    ]);
  nodejsConfig.node_js = answers.version;
  return {
    ...nodejsConfig,
  };
}

module.exports = nodejsBuild;
