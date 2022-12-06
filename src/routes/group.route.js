const express = require('express');

const route = express.Router();

const groupController = require('../app/controllers/GroupController');

route.post('/create', groupController.createGroup)

module.exports = route;