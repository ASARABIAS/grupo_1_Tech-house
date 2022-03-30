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

//eliminar
//router.get('/', productsController.listaProductos);
router.get('/delete/:id', productsController.viewDelete);
router.delete("/delete/:id", productsController.deleteProduct);
module.exports = router;