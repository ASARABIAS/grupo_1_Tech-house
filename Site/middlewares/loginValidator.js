const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Users = db.Usuario;

const loginValidations = [
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('email')/*.custom(value => {
        let usuarioLogueado =  Users.findOne({where: {
            email: req.body.email}})
            if (usuarioLogueado.email == value){
                return true
            }else return false
            


    }).withMessage('Usuario no se encuentra registrado'),
        
    /*
      //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
      body('password').custom( (value, {req}) =>{
          for (let i = 0; i < archivoUsuarios.length; i++) {
              if (archivoUsuarios[i].email == req.body.email) {
                  if(bcrypt.compareSync(value, archivoUsuarios[i].password)){
                    return true;
                  }else{
                    return false;
                  }
              }
          }
          
      }).withMessage('Usuario o contraseña no coinciden')*/
]

module.exports = loginValidations;