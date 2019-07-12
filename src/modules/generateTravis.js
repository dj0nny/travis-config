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
        name: 'excludedBranches',
        message: 'Which branches do you like to exclude? (Specify multiple separated by commas)',
        when: ok => !ok.excludedBranches,
      },
    ]);
  config.sudo = answers.sudo;
  config.branches.only = answers.branches ? answers.branches.split(',').map(a => a.trim()) : undefined;
  config.branches.except = answers.excludedBranches ? answers.excludedBranches.split(',').map(a => a.trim()) : undefined;
  return {
    ...config,
  };
}

module.exports = generateTravis;
