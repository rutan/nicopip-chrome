const fs = require('node:fs');
const path = require('node:path');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'app', 'manifest.json')),
);

module.exports = {
  // output file name
  output: `_dist/${manifest.name}_${manifest.version}.zip`,

  // ignore file (format: .gitignore)
  ignore: ['.DS_Store', 'thumb.db'],
};
