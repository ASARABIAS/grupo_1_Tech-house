const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Users = db.Users;
const multer = require('multer');


const registerValidations = [
    body('name')
    .notEmpty().withMessage('El campo de nombre no puede estar vacio')
    .isLength({min: 2}).withMessage('El nombre debe tener mimimo 2 caracteres'),
	body('email')
		.notEmpty().withMessage('El campo de nombre no puede estar vacio').bail()
		.isEmail().withMessage('Debe escribir un formato de correo válido'),
	body('password')
    .notEmpty().withMessage('El campo de contraseña no puede estar vacio')
    .isLength({min: 8}).withMessage('La contraseña debe tener mimimo 8 caracteres')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "i").withMessage("text"),
    body("country").notEmpty().withMessage('El campo de país no puede estar vacio'),
    body('email').custom( async (value) =>{
        let userFound = await Users.findOne({where: {email: value}});

        if (userFound && userFound.email == value) {
            throw new Error();  
        }
       
        return true;

      }).withMessage('El usuario ya se encuentra registrado'),
      body('avatar').custom((value, {req}) => {
        if(req.file){
            if(req.file.mimetype == "image/png" || req.file.mimetype == "image/jpg" || req.file.mimetype == "image/jpeg"
        || req.file.mimetype == "image/gif"){
            
            return true; 
        }else{
            return false; 
        }
        }else{
            return true;
        }
    })
.withMessage('Solo puede usar imagenes con los formatos: JPG, JPEG, PNG o GIF como su imagen de perfil'),
    
     
      
]

module.exports = registerValidations;