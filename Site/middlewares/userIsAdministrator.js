function userIsAdministrator(req, res, next) {
    if (req.session.usuario.id_role == 1) {
        return res.redirect("/");
    }
    return next();
}

module.exports = userIsAdministrator;