const db = require("../../database/models");
const { use } = require("../../routes/users");

const indexController = {
    list: async (req, res) => {
        const products = await db.Products.findAll();
        const users = await db.Users.findAll();
        const idUser = users[users.length - 1].id;
        const idProduct = products[products.length - 1].id;
        const countByElement = [
            {
                id: 0,
                title: "Productos",
                color: "primary",
                cuantity: products.length,
                route:"products"
            },
            {
                id: 1,
                title: "Usuarios",
                color: "success",
                cuantity: users.length,
                route:"users"
            }
        ];

        res.status(200).json({
            countByElement,
            endElementsById: [idProduct, idUser]
        });
    }
}

module.exports = indexController;