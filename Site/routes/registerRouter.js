const express = require('express');
const router = express.Router();
const controller= require('../controllers/registerController.js');
router.get('/', controller.registro);
module.exports = router;