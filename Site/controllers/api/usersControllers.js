const db = require("../../database/models");

//se define la información que se va a traer del usuario en la lista
const getUsersCollection = (users) => {
  let allUsers = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      detail: `http://localhost:3030/api/users/${user.id}`,
    };
  });
  return allUsers;
};

const usersController = {
  list: async (req, res) => {
    let users = await db.Users.findAll();
    const usersCollection = getUsersCollection(users);
    const response = {
      count: users.length,
      users: usersCollection,
    };
    res.status(200).json(response)
    .catch((error) =>  {
       console.log(error);
  });
  },

  detail: async (req, res) => {
    let id = req.params.id;

    let user = await db.Users.findByPk(id);
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
    .catch((error) =>  {
       console.log(error);
  });
  },
};

module.exports = usersController;
