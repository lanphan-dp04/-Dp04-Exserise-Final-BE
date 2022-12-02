const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");

router.post("/create", userController.create);
router.delete("/:id/delete", userController.delete);
router.patch("/:id", userController.edit);
router.get("/list", userController.show);
router.get("/api", userController.get);
router.get("/", userController.getUser);

module.exports = router;
