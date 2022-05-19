function userIsAdministrator(req, res, next) {
    if (req.session.usuario.rol == 2) {
        return res.redirect("/");
    }
    return next();
}

module.exports = userIsAdministrator;