const { Router } = require('express');
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get("/add_editProduct", productsController.addEditProduct);
router.get("/listaProductos", productsController.listaProductos); // -> Corregir nombre
router.get("/productCart", productsController.productCart);
router.get("/productDetail/:id", productsController.productDetail);

//Create Product

router.get("/addProduct", productsController.addProduct);
router.post("/addProduct", productsController.create);


module.exports = router;