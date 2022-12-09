const express = require('express');

const route = express.Router();

const requestController = require('../app/controllers/RequestController');

route.get('/:id', requestController.getRequest)

module.exports = route;