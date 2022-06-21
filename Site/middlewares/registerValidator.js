const { body } = require('express-validator');
const db = require('../database/models');
const Users = db.Users;



const registerValidations = [
    body('name')
    .notEmpty().withMessage('El campo de nombre no puede estar vacío').bail()
    .isLength({min: 2}).withMessage('El nombre debe tener mínimo 2 caracteres').bail(),
	body('email')
		.notEmpty().withMessage('El campo de correo electrónico no puede estar vacío').bail()
		.isEmail().withMessage('Debe escribir un formato de correo electrónico válido').bail(),
	body('password')
    .notEmpty().withMessage('El campo de contraseña no puede estar vacío').bail()
    .isLength({min: 8}).withMessage('La contraseña debe tener mínimo 8 caracteres').bail()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "i").withMessage("La contraseña debe tener mínimo una letra mayúscula, una letra minúscula, un número y un carácter especial").bail(),
    body("country").notEmpty().withMessage('El campo de país no puede estar vacío').bail(),
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
            //mimetype es el atributo de multer que guarda el formato de la imagen
            return true; 
        }else{
            return false; 
        }
        }else{
            return true;
        }
    })
.withMessage('Solo puede usar imágenes con los formatos: JPG, JPEG, PNG o GIF como su imagen de perfil'),
    
     
      
]

module.exports = registerValidations;