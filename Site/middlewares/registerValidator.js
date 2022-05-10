const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');

let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));

const registerValidations = [
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('email').custom((value) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == value) {
                return false;
            }
        }
        return true;
    }).withMessage('Usuario se encuentra registrado'),
]

module.exports = registerValidations;