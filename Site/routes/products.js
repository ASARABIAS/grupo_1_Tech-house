const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get("/", productsController.list);
router.get("/cart", productsController.cart);

//Create Product
router.get("/create", productsController.create);
router.post("/create", productsController.store);

//editar Product
router.get("/detail/:id", productsController.detail);


module.exports = router;