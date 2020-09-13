const { Router } = require('express');

const exception = require('./controllers/exception');
const rename = require('./controllers/rename');

const routes = Router();

routes.post('/rename', rename);

routes.get('/exception', exception.index);
routes.post('/exception', exception.store);

module.exports = routes;
