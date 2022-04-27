const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');
const userNotLogged = require("../middlewares/userNotLogged");

router.get("/", productsController.list);
router.get("/cart", userNotLogged, productsController.cart);

//Create Product
router.get("/create", userNotLogged, productsController.create);
router.post("/create", userNotLogged, productsController.store);

//detail Product
router.get("/detail/:id", productsController.detail);

//edit Product
router.get("/edit/:id", userNotLogged, productsController.edit);
router.put("/edit/:id", userNotLogged, productsController.update);

//eliminar
//router.get('/', productsController.listaProductos);
router.get('/delete/:id', userNotLogged, productsController.viewDelete);
router.delete("/delete/:id", userNotLogged, productsController.deleteProduct);
module.exports = router;