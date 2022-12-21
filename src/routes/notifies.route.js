const express = require("express");

const route = express.Router();

const notifiesController = require("../app/controllers/NotifiesController");

route.get('/:id', notifiesController.getNotifies);
route.post('/send', notifiesController.updateNotifies);


module.exports = route;
