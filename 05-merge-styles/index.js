const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err)=> {
  if (err) console.log(err);
});
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files)=> {
  if (err) console.log(err);
  fs.access(path.join(__dirname,'project-dist', 'bundle.css'), (err)=> {
    if (err) console.log(err);
    fs.truncate(path.join(__dirname,'project-dist', 'bundle.css'), (err)=> {
      if (err) console.log(err);
    });
  });
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(__dirname, 'styles', file.name),  'utf-8', (err, filecontent)=> {
        if (err) console.log(err);
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), filecontent, (err)=> {
          if (err) console.log(err);
        });
      });
    }
  });
});