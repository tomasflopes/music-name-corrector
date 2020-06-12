const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const routes = Router();

const upload = multer({ storage: storage }).array('file')

routes.get('/main', (request, response) => {
  upload(request, response, (error) => {
    return response.status(400).json(error)
  });

  console.log(request.file);
  const filePath = path.join(__dirname, '..', 'example');

  fs.readdir(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
      const dataArray = data.map(item => item.split(' '));

      const sanitizedData = dataArray.map(music =>
        music.map(word => {
          if (word === '-') return word;
          if (word.endsWith('-')) return word.replace('-', '') + ' -';
          if (word.startsWith('-')) return '- ' + word.replace('-', '');
          if (word.toLowerCase() === 'feat.') return word.toLowerCase();
          if (word[0] === word[0].toLowerCase() && !word.match(/[0-9]-/)) {
            const firstLetter = word.substr(0, 1).toUpperCase();
            return firstLetter + word.substr(1, word.length);
          }
          return word;
        })
      );

      const finalData = sanitizedData.map(nameArray => {
        return nameArray.join(' ');
      });

      for (let i = 0; i < finalData.length; i++) {
        fs.rename(path.join(__dirname, '..', 'example', data[i]), path.join(__dirname, '..', 'example', finalData[i]), function (err) {
          if (err) console.log('ERROR: ' + err);
        });
      }

      return response.json(finalData);
    }
  });
});

module.exports = routes;
