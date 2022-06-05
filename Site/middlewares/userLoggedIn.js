const User = require("../routes/users");
const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const Users = db.Usuario;

async function userLoggedIn(req, res, next) {

    let emailInCookie = req.cookies.userEmail;

    if(emailInCookie){
        let userFromCookie = await Users.findOne({
            where:{
                email: emailInCookie
            }
        })
        if (userFromCookie) {
            req.session.usuario = userFromCookie;
        }
    }
    return next();
}

module.exports = userLoggedIn;