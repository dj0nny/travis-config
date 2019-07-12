const fs = require('fs');
const path = require('path');

function isGitSync(dir) {
  return fs.existsSync(path.join(dir, '.git'));
}

module.exports = isGitSync;
