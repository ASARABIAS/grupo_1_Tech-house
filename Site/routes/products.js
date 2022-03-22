const { Router } = require('express');
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get("/listaProductos", productsController.listaProductos);
router.get("/productCart", productsController.productCart);
router.get("/productDetail", productsController.productDetail);

//Create Product

router.get("/addProduct", productsController.addProduct);
router.post("/addProduct", productsController.create);


module.exports = router;