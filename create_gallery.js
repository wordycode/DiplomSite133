'use strict';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const sharp = require('sharp');
const images = fs.readdirSync('./public/images/gallery/photos');
//создание и запись image.json
fs.writeFile('images.json', JSON.stringify(images), 'utf8', function (err) {
    console.log(err);
});

for (let i = 0; i < images.length; i++) {
    sharp('./public/images/gallery/photos/' + images[i])
        .resize(240, 180)
        .toFile('./public/images/gallery/thumbs/' + images[i], (err, info) => {
            console.log(err);
        });
}