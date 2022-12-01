const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get("/api", userController.get);
router.get("/", userController.getUser);

module.exports = router;