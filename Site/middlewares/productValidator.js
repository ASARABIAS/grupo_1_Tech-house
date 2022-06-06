const { body } = require("express-validator");

const productsValidation = [
    body("name").notEmpty().withMessage("Debes ingresar el nombre del producto").bail(),
    body("specifications").notEmpty().withMessage("Debes ingresar las especificaciones del producto").bail(),
    body("category").notEmpty().withMessage("Debes escoger una categoría para tu producto").bail(),
    body("warrantyText").notEmpty().withMessage("Debes describir la garantía de tu producto").bail(),
    body("paymentMethod").notEmpty().withMessage("Debes escoger al menos un método de pago").bail(),
    body("price").notEmpty().withMessage("Debes ingresar el precio del producto").bail(),
    body("discount").notEmpty().withMessage("Debes ingresar el descuento del producto o 0 si no tiene descuento").bail(),
];

module.exports = productsValidation;