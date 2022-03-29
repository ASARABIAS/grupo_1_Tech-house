const express = require('express');
const router = express.Router();
const controller= require('../controllers/listaProductosController.js');

router.get('/', controller.listaProductos);
router.get('/eliminar/:id', controller.viewDelete);
router.delete("/eliminar/:id", controller.deleteProduct);
module.exports = router;
