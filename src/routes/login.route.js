const express = require('express');

const route = express.Router();

const loginControllor = require('../app/controllers/LoginController');

//route.get('/', loginControllor.get)
route.post('/', loginControllor.post)

module.exports = route;