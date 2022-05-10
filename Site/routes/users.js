const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer');


const usersController = require('../controllers/usersController.js');

const loginValidations = require("../middlewares/loginValidator");
const registerValidations = require("../middlewares/registerValidator");
const userNotLogged = require("../middlewares/userNotLogged");
const checkRoutesForLoggedUser = require("../middlewares/checkRoutesForLoggedUser");

router.get("/login", checkRoutesForLoggedUser,usersController.login); // ocultar por backend
router.post("/login", loginValidations, usersController.check);

/*router.get("/edit/:idUser", usersController.edit);
router.put("/edit", function(req, res){ 
})*/

router.get("/register", checkRoutesForLoggedUser,usersController.register); // ocultar por backend

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.post("/register", upload.single('avatar'), registerValidations, usersController.store);
router.get("/logout", usersController.logout);
router.get("/profile", userNotLogged, usersController.profile);
router.get("/preferences", userNotLogged, usersController.preferences);
router.put("/update", userNotLogged, upload.single('avatar'), usersController.update)

module.exports = router;