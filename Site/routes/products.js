const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get("/list", productsController.list);
router.get("/cart", productsController.cart);



//Create Product
router.get("/add", productsController.add);
router.post("/add", productsController.create);

//Edit Product
router.get("/detail/:id", productsController.detail);


module.exports = router;