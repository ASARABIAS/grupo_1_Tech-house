const express = require ("express");
const router = express.Router();
const usersController = require("../../controllers/api/usersControllers");

router.get("/api/users", usersController.list);
router.get("/api/users/:id", usersController.detail);
router.post("/api/users/login", usersController.login);
router.get("/api/check", usersController.checkToken);
router.get("/api/logout", usersController.logout);



module.exports = router;