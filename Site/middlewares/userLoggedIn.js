const User = require("../routes/users");
const path = require("path");
const fs = require("fs");

function userLoggedIn (req, res, next) {
    if(req.session.usuario){
        return res.redirect("/");
    }

    let emailInCookie = req.cookies.userEmail;
    let users=JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), "utf-8"));
    let userFromCookie = users.find(user=>user.email==emailInCookie);

    //let userFromCookie = User.findByField("email", emailInCookie);

    console.log(userFromCookie);

   if (userFromCookie){
       req.session.userLoggedIn = userFromCookie;
   }

    next();
}

module.exports = userLoggedIn;