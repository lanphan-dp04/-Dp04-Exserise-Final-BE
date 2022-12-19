const express = require('express');

const route = express.Router();

const historyController = require('../app/controllers/HistoryController');

route.get('/:id', historyController.getHistory)

module.exports = route;