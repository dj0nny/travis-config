#! /usr/bin/env node

const yaml = require('js-yaml');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const isGitSync = require('./modules/isGitSync');

const travisPath = path.join(process.cwd(), '.travis.yml');
const existingconfig = fs.existsSync(travisPath);

const nodejsBuild = require('./modules/nodejsBuild');
const rubyBuild = require('./modules/rubyBuild');

const generateTravis = require('./modules/generateTravis');

let travisConfig;
let travisConfigFinal;

async function buildConfig() {
  const answers = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'lang',
        message: 'Select a language for the build',
        choices: [
          'node.js',
          'ruby',
        ],
      },
    ]);
  if (answers.lang === 'node.js') {
    travisConfig = await nodejsBuild();
  } else {
    travisConfig = await rubyBuild();
  }
  travisConfigFinal = await generateTravis(travisConfig);
  const dump = yaml.dump(travisConfigFinal, {
    flowLevel: 10,
    styles: {
      '!!int': 'hexadecimal',
      '!!null': 'camelcase',
    },
  });
  fs.writeFileSync(travisPath, dump, 'utf-8');
}

if (isGitSync(process.cwd())) {
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
          buildConfig();
        } else {
          process.exit(0);
        }
      });
  } else {
    buildConfig();
  }
} else {
  console.log('There is not git repository in this folder');
  process.exit(1);
}
