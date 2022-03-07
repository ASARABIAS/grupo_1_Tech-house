const express = require('express');
const router = express.Router();
// Aća nos falta traer el controller
const controller= require('../controllers/mainController.js');
// Acá definimos las rutas
router.get('/', controller.main);

// Acá exportamos el resultado
module.exports = router;