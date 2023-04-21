//'use strict';

//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);

//const fs = require('fs');
//const docupr = fs.readdirSync('./public/documents/[Договор управления, Отчеты о выполнении договора управления, Отчеты совета дома о проделанной работе, Схема гостевой парковки во дворе МКД]/');
//создание и запись docs.json
//fs.writeFile('docs.json', JSON.stringify(docupr), 'utf8', function (err) {
  //  console.log(err);
//});




//const fs = require('fs');
//const docs = fs.readdirSync('./public/documents/');
//создание и запись image.json
//fs.writeFile('docs.json', JSON.stringify(docs), 'utf8', function (err) {
 //   console.log(err);
//});
//console.log(docs)
//var list_doc
//for (let i = 0; i < docs.length; i++) {
//    list_doc = fs.readdirSync('docs[i]');
//    JSON.stringify(list_doc)
//}


//for (let i = 0; i < images.length; i++) {
//    sharp('./public/images/gallery/photos/' + images[i])
 //       .resize(240, 180)
 //       .toFile('./public/images/gallery/thumbs/' + images[i], (err, info) => {
 //           console.log(err);
 //       });
//}


// 
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
//const fs = require('fs');
//const path = require('path');


// Массив папок, содержимое которых нужно получить
//const folderPaths = ['./public/documents/Договор управления', './public/documents/Отчеты о выполнении договора управления', './public/documents/Отчеты совета дома о проделанной работе', './public/documents/Схема гостевой парковки во дворе МКД' ];

// Массив для уникальных имен файлов
//let docs = [];

// Для каждой папки в массиве folderPaths
//folderPaths.forEach(folderPath => {
//   const fileNames = fs.readdirSync(folderPath);
 //   const docs = [...new Set(fileNames)];
//    uniqueFileNamesByFolder[folderPath] = docs;
//  });

// Выводим массив уникальных имен файлов в консоль
//console.log(docs);
//fs.writeFile('docs.json', JSON.stringify(docs), 'utf8', function (err) {
//    console.log(err);
//});
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

const baseDir = './public/documents/';

// Получаем список всех папок в baseDir
const folders = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Создаем массив путей к папкам
const folderPaths = folders.map(folder => path.join(baseDir, folder));
  
  // Создаем объект, где ключи - это имена папок, а значения - массивы имен файлов
  const docs = {};
  
  // Проходим по каждой папке
  folderPaths.forEach((folderPath) => {
    // Получаем имя папки
    const folderName = path.basename(folderPath);
  
    // Получаем список файлов в папке
    const files = fs.readdirSync(folderPath);
  
    // Добавляем список файлов в объект
    docs[folderName] = files;
  });
  
  // Сохраняем объект в файле docs.json
  fs.writeFileSync('docs.json', JSON.stringify(docs));
  console.log(docs)


