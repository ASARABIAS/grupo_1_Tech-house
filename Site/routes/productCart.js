const express = require("express");
const routerProductCart = express.Router();

const productCartController = require ("../controllers/productCartController");

routerProductCart.get("/productCart", productCartController.productCart);

module.exports = routerProductCart;