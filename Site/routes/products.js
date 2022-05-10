const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');
const userNotLogged = require("../middlewares/userNotLogged");
const userIsAdministrator = require("../middlewares/userIsAdministrator");

router.get("/", userNotLogged, userIsAdministrator, productsController.list);
router.get("/cart", userNotLogged, productsController.cart);

//Create Product
router.get("/create", userNotLogged, userIsAdministrator, productsController.create);
router.post("/create", userNotLogged, userIsAdministrator, productsController.store);

//detail Product
router.get("/detail/:id", productsController.detail);

//edit Product
router.get("/edit/:id", userNotLogged, userIsAdministrator, productsController.edit);
router.put("/edit/:id", userNotLogged, userIsAdministrator, productsController.update);

//eliminar
//router.get('/', productsController.listaProductos);
router.get('/delete/:id', userNotLogged, userIsAdministrator, productsController.viewDelete);
router.delete("/delete/:id", userNotLogged, userIsAdministrator, productsController.deleteProduct);
module.exports = router;