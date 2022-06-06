const { body } = require("express-validator");

const editProductsValidation = [
    body("name").notEmpty().withMessage("El nombre de tu producto no fue editado, ya que el campo estaba vacío").bail(),
    body("specifications").notEmpty().withMessage("Las especificaciones de tu producto no fueron editadas, ya que el campo estaba vacío").bail(),
    body("category").notEmpty().withMessage("La categoría del producto no fue editada, ya que el campo estaba vacío").bail(),
    body("warrantyText").notEmpty().withMessage("La descripcion de la garantía de tu producto no fue editada, ya que el campo estaba vacío").bail(),
    body("paymentMethod").notEmpty().withMessage("El método de pago de tu producto no fue editado, ya que el campo estaba vacío").bail(),
    body("price").notEmpty().withMessage("El precio de tu producto no fue editado, ya que el campo estaba vacío").bail(),
    body("discount").notEmpty().withMessage("El descuento de tu producto no fue editado, ya que el campo estaba vacío").bail(),
];

module.exports = editProductsValidation;