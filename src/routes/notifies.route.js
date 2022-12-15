const express = require('express');

const route = express.Router();

const notifiesController = require('../app/controllers/NotifiesController');

route.get('/', notifiesController.getNotifies);

module.exports = route;