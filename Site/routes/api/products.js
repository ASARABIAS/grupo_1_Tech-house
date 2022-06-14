const express = require ("express");
const router = express.Router();
const productsController = require("../../controllers/api/productsController");

router.get("/api/products", productsController.list);
router.get("/api/products/:id", productsController.detail);

module.exports = router;