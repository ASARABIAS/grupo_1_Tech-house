const User = require("../routes/users");
const path = require("path");
const fs = require("fs");

function userLoggedIn(req, res, next) {

    let emailInCookie = req.cookies.userEmail;

    let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), "utf-8"));
    let userFromCookie = users.find(user => user.email == emailInCookie);

    if (userFromCookie) {
        req.session.usuario = userFromCookie;
    }

    return next();
}

module.exports = userLoggedIn;