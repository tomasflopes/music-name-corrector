const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const routes = Router();

routes.post('/main', (request, response) => {
  const { dir } = request.body;

  let finalData = [];

  for (let i = 0; i < 2; i++) {
    fs.readdir(dir, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        const dataArray = data.map(item => item.split(' '));

        const sanitizedData = dataArray.map(music =>
          music.map(word => {
            if (word === '') return;
            if (word === '-') return word;
            if (word.toLowerCase() === 'deau') return 'DEAU';
            if (word.toLowerCase() === 'kaines') return 'kAINES';
            if (word.toLowerCase() === 's.e.f.') return 'S.E.F.';
            if (word.toLowerCase() === 'profjam') return 'ProfJam';
            if (word.toLowerCase() === 'xtinto') return 'XTinto';
            if (word.toLowerCase() === 'x-tense') return 'X-Tense';
            if (word.toLowerCase() === 'rdc') return 'RDC';
            if (word.toLowerCase() === 'gson') return 'GSon';
            if (word.toLowerCase() === 'grognation') return 'GROGNation';
            if (word.endsWith('-')) return word.replace('-', '') + ' -';
            if (word.startsWith('-')) return '- ' + word.replace('-', '');
            if (word.toLowerCase() === 'feat.') return word.toLowerCase();
            if (word.match(/[0-9]-/)) return word;
            if (word.startsWith('(')) {
              const firstLetter = word.substr(1, 1).toUpperCase();
              return '(' + firstLetter + word.substr(2, word.length).toLowerCase();
            }
            const firstLetter = word.substr(0, 1).toUpperCase();
            return firstLetter + word.substr(1, word.length).toLowerCase();
          })
        );

        finalData = sanitizedData.map(nameArray => {
          return nameArray.join(' ');
        });

        for (let i = 0; i < finalData.length; i++) {
          fs.rename(`${dir}/${data[i]}`, `${dir}/${finalData[i]}`, function (err) {
            if (err) console.log('ERROR: ' + err);
          });
        }
      } else {
        return response.status(400).json(err);
      }

      return response.json(finalData);
    });
  }
});

module.exports = routes;
