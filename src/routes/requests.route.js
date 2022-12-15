const express = require('express');

const route = express.Router();

const requestController = require('../app/controllers/RequestController');

route.get('/:id', requestController.getRequests)
route.get('/detail/:id', requestController.getDetailRequests)
route.post('/reject', requestController.rejectRequest)
route.post('/approve', requestController.approveRequest)
route.post('/change', requestController.changeRequest)

module.exports = route;