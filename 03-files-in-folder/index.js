const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),{ withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (err, stats) => {
            if (err) {
              return console.log(err);
            }
            else console.log(`${fileName[0]} - ${fileName[1]} - ${stats.size}`);
          });
        const fileName = path.basename(file.name).split('.');
      }
    });
  });