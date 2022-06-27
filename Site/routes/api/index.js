const express = require ("express");
const router = express.Router();
const indexController = require("../../controllers/api/indexController");

router.get("/api/index", indexController.list);

module.exports = router;