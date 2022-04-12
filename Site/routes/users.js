const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

router.get("/login", usersController.login);
router.post("/login", usersController.check)

router.get("/register", usersController.registro);
//crear usuario
router.post("/create", usersController.createUser);
module.exports = router;