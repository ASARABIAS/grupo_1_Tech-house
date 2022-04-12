const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');


//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let users = resultReadJSON(JSONPath('users.json'));

const usersController = {
    login: (req, res) => {
        res.render('users/login');
    },
    check: (req, res) => {
        let body = req.body;

        let user = users.find(user => user.email === body.user && user.password === body.password);

        if (user) {
            res.redirect('/');
        } else {
            res.redirect('/users/login');
        }

    },
    registro: (req, res) => {
        res.render('users/register');
    },
    createUser: function(req, res) {
        let body = req.body
        let newUser = {
          id: Date.now(),
          name: body.name,
          lastName: body.lastName,
          email: body.email,
          password: bcryptjs.hashSync(body.password, 12),
          country: body.country,
          Avatar: body.avatar,
        }

        users.push(newUser);

        let usersJSON = JSON.stringify(users, null, ' ');

        fs.writeFileSync(JSONPath('users.json'), usersJSON);
        res.redirect('/');
    }

}

module.exports = usersController;