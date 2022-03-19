const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get("/add_editProduct", productsController.addEditProduct);
router.get("/listaProductos", productsController.listaProductos);
router.get("/productCart", productsController.productCart);
router.get("/productDetail", productsController.productDetail);

module.exports = router;