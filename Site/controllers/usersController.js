const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const Users = db.Usuario;

const usersController = {
    home: (req, res) => {
        res.render("/", {
            users: req.session.usuario
        })
    },
    login: (req, res) => {
        res.render('users/login');
    },
    check: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            let userLoggedIn = await Users.findOne({where: {
                email: req.body.email}});
                if(await bcrypt.compare(req.body.password, userLoggedIn.password)){
                    req.session.usuario = userLoggedIn;
                }
            
            if (req.body.recordar_usuario) {
                res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            res.redirect('/');
        }else {
            res.render('users/login', { errors: errors.mapped() });
        }
        
    },
    register: (req, res) => {
        res.render('users/register');
    },
    store: (req, res) => {

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let body = req.body;
            let file = req.file;

            Users
        .create(
            {
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 12),
                country: body.country,
                avatar: !file ? "logo.png" : file.filename,
                id_role: 1
            }
        )
                   
        .catch(error => console.log(error))
        .then(()=> {
            return res.redirect('/login')})
    }else{
        res.render('users/register', { errors: errors.mapped() });
    }},

    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect('/')
    },
    profile: (req, res) => {
        const user = req.session.usuario;
        res.render('users/profile', { user });
    },

    update: function(req, res) {

        const user = req.session.usuario;
        const body = req.body;
        const file = req.file;

        user.name = body.name;
        user.email = body.email;
        user.country = body.country;
        user.Avatar = file ? file.filename : user.Avatar;

        Users.update({
            name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 12),
                country: body.country,
                avatar: !file ? "logo.png" : file.filename,
                id_role: 1
        }, {where:{
            id: user.id
        }})
             res.redirect('profile');
        
    },

    preferences: (req, res) => {
        res.send("Favoritos en desarrollo");
    }
}

module.exports = usersController;