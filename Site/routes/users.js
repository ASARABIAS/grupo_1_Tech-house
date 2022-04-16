const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

const loginValidations = require("../middlewares/loginValidator");

router.get("/login", usersController.login);
router.post("/login", loginValidations, usersController.check);

router.get("/register", usersController.registro);
router.get("/logout", usersController.logout);
//crear usuario
router.post("/create", usersController.createUser);
module.exports = router;