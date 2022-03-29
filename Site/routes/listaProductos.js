const express = require('express');
const router = express.Router();
const controller= require('../controllers/listaProductosController.js');

router.get('/', controller.listaProductos);
router.get('/delete/:id', controller.viewDelete);

//router.delete('/delete/:id', controller.delete);
module.exports = router;
