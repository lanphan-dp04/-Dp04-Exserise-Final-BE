const express = require('express');

const route = express.Router();

const requestController = require('../app/controllers/RequestController');

route.get('/:id', requestController.getRequests)
route.get('/', requestController.getListRequest)
route.get('/detail/:id', requestController.getDetailRequests)
route.post('/reject', requestController.rejectRequest)
route.post('/approve', requestController.approveRequest)
route.post('/change', requestController.changeRequest)
// route.post('/revertApproved', requestController.revertApproved)
// route.post('/revertRejected', requestController.revertRejected)

module.exports = route;