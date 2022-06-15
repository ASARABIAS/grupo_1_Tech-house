const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const req = require('express/lib/request');
const Users = db.Users;


const loginValidations = [
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido').bail(),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail(),
    body('email').custom(value =>{
        return Users.findOne({where: {
            email: value}})
            .then(user => {
                if (!user) {
                  return Promise.reject('El usuario no se encuentra registrado');}})
    }).bail(),
    body('password').custom( (value, {req}) => {
        return Users.findOne({where: {
            email: req.body.email}})
            .then(user => {
                if(user == null){
                    return false}
                if(!bcrypt.compareSync(value,user.password)){
                    return Promise.reject('La contraseña es incorrecta')
                }           
            });
    })
    .bail(),
]

module.exports = loginValidations;