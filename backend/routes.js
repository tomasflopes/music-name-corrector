const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const routes = Router();

routes.post('/main', (request, response) => {
  const { dir } = request.body;

  fs.readdir(dir, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
      const dataArray = data.map(item => item.split(' '));

      const sanitizedData = dataArray.map(music =>
        music.map(word => {
          console.log(word);
          if (word === '') return;
          if (word === '-') return word;
          if (word.endsWith('-')) return word.replace('-', '') + ' -';
          if (word.startsWith('-')) return '- ' + word.replace('-', '');
          if (word.toLowerCase() === 'feat.') return word.toLowerCase();
          if (word.match(/[0-9]-/)) return word;
          const firstLetter = word.substr(0, 1).toUpperCase();
          return firstLetter + word.substr(1, word.length).toLowerCase();
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
    } else {
      return response.status(400).json(err);
    }
  });
});

module.exports = routes;
