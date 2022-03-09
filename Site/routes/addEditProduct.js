const express = require('express');
const router = express.Router();
const controller= require('../controllers/addEditProductController.js');
router.get('/', controller.addEditProduct);
module.exports = router;
