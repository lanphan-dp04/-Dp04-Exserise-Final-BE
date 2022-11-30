const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get("/api", userController.get);

module.exports = router;