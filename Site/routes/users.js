const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer');


const usersController = require('../controllers/usersController.js');

router.get("/login", usersController.login);
router.post("/login", usersController.check)

router.get("/register", usersController.registro);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.post("/register", upload.single('avatar'), usersController.store);
module.exports = router;