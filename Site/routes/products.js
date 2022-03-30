const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get("/", productsController.list);
router.get("/cart", productsController.cart);

//Create Product
router.get("/create", productsController.create);
router.post("/create", productsController.store);

//detail Product
router.get("/detail/:id", productsController.detail);

//edit Product
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", productsController.update);

//eliminar
//router.get('/', productsController.listaProductos);
router.get('/delete/:id', productsController.viewDelete);
router.delete("/delete/:id", productsController.deleteProduct);
module.exports = router;