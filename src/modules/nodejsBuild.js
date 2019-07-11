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
      {
        type: 'confirm',
        name: 'sudo',
        message: 'Run in sudo mode?',
        default: false,
      },
    ]);
  nodejsConfig.node_js = answers.version;
  nodejsConfig.sudo = answers.sudo;
  return {
    ...nodejsConfig,
  };
}

module.exports = nodejsBuild;
