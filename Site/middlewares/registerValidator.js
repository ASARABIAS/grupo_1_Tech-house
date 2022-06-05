const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Users = db.Usuario;

let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));

const registerValidations = [
    body('name')
    .notEmpty().withMessage('El campo de nombre no puede estar vacio'),
	body('email')
		.notEmpty().withMessage('El campo de nombre no puede estar vacio').bail()
		.isEmail().withMessage('Debe escribir un formato de correo válido'),
	body('password')
    .notEmpty().withMessage('El campo de contraseña no puede estar vacio')
    .isLength({min: 6}).withMessage('La contraseña debe tener mimimo 6 caracteres'),
    body("country").notEmpty().withMessage('El campo de país no puede estar vacio'),
    body('email').custom( async (value) =>{
        let userFound = await Users.findOne({where: {email: value}});

        if (userFound && userFound.email == value) {
            throw new Error();  
        }
       
        return true;

      }).withMessage('El usuario ya se encuentra registrado'),
    
      //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
      
]

module.exports = registerValidations;