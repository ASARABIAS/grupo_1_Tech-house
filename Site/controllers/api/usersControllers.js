const db = require("../../database/models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUsersRoles = async (roles) => {
  const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
  let aux = [];
  let cuantity, indexColor = 0;
  for (let i = 0; i < roles.length; i++) {

    cuantity = await db.Users.count({ where: { id_role: roles[i].id } })

    aux.push({
      id: roles[i].id,
      title: roles[i].name,
      color: color[indexColor < color.length ? indexColor++ : indexColor = 0],
      cuantity: cuantity,
    });
  }
  return aux;
}

//se define la información que se va a traer del usuario en la lista
const getUsersCollection = (users) => {
  let allUsers = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      //email: user.email,
      image: `http://localhost:3030/images/users/${user.avatar}`,
      specifications: user.email,
      id_role: user.id_role,
      detail: `http://localhost:3030/api/users/${user.id}`,
    };
  });
  return allUsers;
};

const usersController = {
  list: async (req, res) => {
    let pageNumber = req.query.page;
    const usersPerPage = 6;
    const queryOptions = {};
    let maxPages;
    if (pageNumber && pageNumber > 0) {
      pageNumber = parseInt(pageNumber);
      const totalUsers = await db.Users.count();
      maxPages = Math.ceil(totalUsers / usersPerPage);
      if (pageNumber > maxPages) {
        pageNumber = maxPages;
      }
      queryOptions.limit = usersPerPage;
      queryOptions.offset = usersPerPage * (pageNumber - 1);
    }
    let users = await db.Users.findAll(queryOptions).catch(error => res.send(error));
    const usersCollection = getUsersCollection(users);
    const roles = await db.Roles.findAll()
    const countByRol = await getUsersRoles(roles);
    const response = {
      count: users.length,
      countByRol,
      users: usersCollection,
    };
    if (pageNumber && pageNumber > 0) {
      response.pages = {
        current: pageNumber,
        next: pageNumber < maxPages ? pageNumber + 1 : null,
        previous: pageNumber == 1 ? null : pageNumber - 1,
        total: maxPages
      }
    }
    res.status(200).json(response)
    /*
      .catch((error) => {
        console.log(error);
      });
      */
  },

  detail: async (req, res) => {
    const { id } = req.params;

    const user = await db.Users.findByPk(id);
    let response, status;

    if (user) {
      const image = `http://localhost:3030/images/users/${user?.avatar}`;
      status = 200;
      response = {
        status,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          country: user.country,
          avatar: user.avatar,
          imageUrl: image,
        }
      }
    } else {
      status = 501;
      response = {
        status,
        data: "No se encuentra el Usuario"
      }
    }

    res.status(200).json(response);
  },

  end: async () => await db.Users.max('id'),

  //Endpoint para generar el token de autenticación

  login: async (req, res) => {
    const { email, password } = req.body;
    let userLoggedIn = await db.Users.findOne({
      where: {
        email,
        id_role:2
      }
    });
    if (userLoggedIn && await bcrypt.compare(password, userLoggedIn.password)) {
      req.session.usuario = userLoggedIn;
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
      res.status(200).json({
        status: 200,
        data: {
          token,
          expiresIn: 3600
        }
      });
    } else {
      res.status(401).json({
        status: 401,
        data: {
          error: 'Invalid username or password'
        }

      });
    }
  },
  checkToken: (req, res) => {
    //Recibo el token del header del request
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({
        status: 401,
        data: {
          error: 'No token provided'
        }
      });
    } else {
      jwt.verify(token, 'secret', async (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: 401,
            data: {
              error: 'Token is not valid'
            }
          });
        } else {
          const user = await db.Users.findOne({
            where: {
              email: decoded.email
            }
          });
          //Acá se puede usar una base de datos para obtener la información del usuario y responder al cliente
          res.status(200).json({
            status: 200,
            data: {
              avatar: `http://localhost:3030/images/users/${user.avatar}`,
              country: user.country,
              email: user.email,
              name: user.name,
            }
          });
        }
      });
    }
  }
};

module.exports = usersController;

