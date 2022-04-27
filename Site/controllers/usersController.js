const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');


//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let users = resultReadJSON(JSONPath('users.json'));

const usersController = {
    home: (req, res) => {
        res.render("/", {
            users: req.session.usuario
        })
    },
    login: (req, res) => {
        res.render('users/login');
    },
    check: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let usuarioLogueado = users.find(usuario => usuario.email == req.body.email);
            req.session.usuario = usuarioLogueado;
            if (req.body.recordar_usuario) {
                res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            res.redirect('/');
        } else {
            res.render('users/login', { errors: errors.mapped() });
        }
    },
    register: (req, res) => {
        res.render('users/register');
    },
    store: (req, res) => {

        let body = req.body;
        let file = req.file;

        let newUser = {
            id: Date.now(),
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            password: bcryptjs.hashSync(body.password, 12),
            country: body.country,
            Avatar: !file ? "logo.png" : file.filename
        }

        users.push(newUser);

        let usersJSON = JSON.stringify(users, null, ' ');

        fs.writeFileSync(JSONPath('users.json'), usersJSON);

        res.redirect('login');
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect('/')
    },
    profile: (req, res) => {
        const user = req.session.usuario;
        res.render('users/profile', { user });
    },
    preferences: (rq, res) => {
        res.send("Favoritos en desarrollo");
    }
}

module.exports = usersController;