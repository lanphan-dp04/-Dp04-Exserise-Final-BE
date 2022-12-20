const express = require('express');

const route = express.Router();

const dayoffController = require('../app/controllers/DayOffController');

route.post('/create', dayoffController.createDayOff)
route.get('/:id', dayoffController.getDayOff)
route.post('/update', dayoffController.updateDayOff)
route.post('/revert', dayoffController.revertDayOff)

module.exports = route;