const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer');


const productsController = require('../controllers/productsController.js');
const userNotLogged = require("../middlewares/userNotLogged");
const userIsAdministrator = require("../middlewares/userIsAdministrator");

router.get("/", userNotLogged, userIsAdministrator, productsController.list);
router.get("/cart", userNotLogged, productsController.cart);

//Create Product
router.get("/create", userNotLogged, userIsAdministrator, productsController.create);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.post("/create", upload.single('productImage'), userNotLogged, userIsAdministrator, productsController.store);

//detail Product
router.get("/detail/:id", productsController.detail);

//edit Product
router.get("/edit/:id", userNotLogged, userIsAdministrator, productsController.edit);
router.put("/edit/:id", userNotLogged, upload.single('productImage'), userIsAdministrator, productsController.update);

//eliminar
//router.get('/', productsController.listaProductos);
router.get('/delete/:id', userNotLogged, userIsAdministrator, productsController.viewDelete);
router.delete("/delete/:id", userNotLogged, userIsAdministrator, productsController.deleteProduct);
module.exports = router;