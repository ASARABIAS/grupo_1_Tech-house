const db = require("../../database/models");

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
    let users = await db.Users.findAll() .catch((error) =>  {
      console.log(error);
     });
    const usersCollection = getUsersCollection(users);
    const roles = await db.Roles.findAll()
    const countByRol = await getUsersRoles(roles);
    const response = {
      count: users.length,
      countByRol,
      users: usersCollection,
    };
    res.status(200).json(response)
  },

  detail: async (req, res) => {
    const { id } = req.params;

    let user = await db.Users.findByPk(id) 
    .catch((error) =>  {
      console.log(error);
 });
    const image = `http://localhost:3030/images/users/${user.avatar}`;
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      avatar: user.avatar,
      imageUrl: image,
    }
    res.status(200).json(userResponse) 
  },
};

module.exports = usersController;
