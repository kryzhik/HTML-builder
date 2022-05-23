const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;
const readline = require('readline').createInterface({input:stdin, output:stdout});


fs.writeFile(
  path.join(__dirname, 'file.txt'), '', function(err) {
    if (err) console.log(err);
  }
);

readline.setPrompt('Введите текст\n');
readline.prompt();
readline.on('line', (text)=> {
  fs.appendFile(
    path.join(__dirname, 'file.txt'), text + '\n', (err)=> {
      if (err) console.log(err);
      if (text.toString() == 'exit') readline.close();
    }
  );
});


process.on('exit', () => console.log('Закончили ввод!'));