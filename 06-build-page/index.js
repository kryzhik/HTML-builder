const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'),{recursive:true}, err=> {
  if (err) console.log(err);
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, filecontent)=> {
    if (err) console.log(err);
    let templateContent = filecontent;
    fs.readFile(path.join(__dirname, 'components', 'header.html'), 'utf-8', (err, headerFileContent)=> {
      if (err) console.log(err);
      templateContent = templateContent.replace(/\{\{header\}\}/, headerFileContent);
      fs.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf-8', (err, articlesFileContent)=> {
        if (err) console.log(err);
        templateContent = templateContent.replace(/\{\{articles\}\}/, articlesFileContent);
        fs.readFile(path.join(__dirname, 'components', 'footer.html'), 'utf-8', (err, footerFileContent)=> {
          if (err) console.log(err);
          templateContent = templateContent.replace(/\{\{footer\}\}/, footerFileContent);
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateContent, (err)=> {
            if (err) console.log(err);
          });
        });  
      });    
    });     
  });
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err)=> {
    if (err) console.log(err);
  });
  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files)=> {
    if (err) console.log(err);
    fs.access(path.join(__dirname,'project-dist', 'style.css'), (err)=> {
      if (err) console.log(err);
      fs.truncate(path.join(__dirname,'project-dist', 'style.css'), (err)=> {
        if (err) console.log(err);
      });
    });
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', file.name),  'utf-8', (err, filecontent)=> {
          if (err) console.log(err);
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), filecontent, (err)=> {
            if (err) console.log(err);
          });
        });
      }
    });
  });
  fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true },(err, files)=> {
    if (err) console.log(err);
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),{recursive:true}, err=> {
      if (err) console.log(err);
      files.forEach((file)=> {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name),{recursive:true}, err=> {
          if (err) console.log(err);
          fs.readdir(path.join(__dirname, 'assets', file.name), { withFileTypes: true }, (err, subFiles)=> {
            if (err) console.log(err);
            subFiles.forEach(subfile=> {
              fs.copyFile(path.resolve(__dirname, 'assets', file.name + '/' + subfile.name), path.resolve(__dirname, 'project-dist', 'assets', file.name + '/' + subfile.name), err=> {
                if (err) console.log(err);
              });
            });
          });
        }); 
      });
    });
  });
});
