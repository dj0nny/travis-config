const inquirer = require('inquirer');
const getCurrentBranchName = require('node-git-current-branch');

async function generateTravis(config) {
  const answers = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'sudo',
        message: 'Run in sudo mode?',
        default: false,
      },
      {
        type: 'text',
        name: 'branches',
        message: 'Which branches do you like to deploy? (Specify multiple separated by commas)',
        default: getCurrentBranchName(),
      },
      {
        type: 'confirm',
        name: 'branchesConfirm',
        message: 'Do you want to exclude some branches?',
        default: false,
      },
      {
        type: 'text',
        name: 'builtScript',
        message: 'Which scripts execute for the installing? (Specify multiple separated by commas)',
      },
    ]);
  config.sudo = answers.sudo;
  config.branches.only = answers.branches ? answers.branches.split(',').map(a => a.trim()) : '';
  config.branches.except = answers.excludedBranches ? answers.excludedBranches.split(',').map(a => a.trim()) : '';
  config.install = answers.builtScript ? answers.builtScript.split(',').map(a => a.trim()) : '';
  return {
    ...config,
  };
}

module.exports = generateTravis;
