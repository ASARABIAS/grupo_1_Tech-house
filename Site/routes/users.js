const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

const loginValidations = require("../middlewares/loginValidator");
const userLoggedIn = require("../middlewares/userLoggedIn");
const userNotLogged = require("../middlewares/userNotLogged");

router.get("/login", usersController.login);
router.post("/login", loginValidations, usersController.check);

router.get("/register",userLoggedIn, usersController.registro);
router.get("/logout", usersController.logout);
router.get("/", userNotLogged, usersController.home);   
//crear usuario
router.post("/create", usersController.createUser);
module.exports = router;