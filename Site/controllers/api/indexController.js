const db = require("../../database/models");
const { use } = require("../../routes/users");

const indexController = {
    list: async (req, res) => {
        const countUsers = await db.Users.count();
        const countProducts = await db.Products.count();
        const products = await db.Products.findAll();
        const users = await db.Users.findAll();
        const countByElement = [
            {
                id: 0,
                title: "Productos",
                color: "primary",
                cuantity: countProducts,
            },
            {
                id: 1,
                title: "Usuarios",
                color: "success",
                cuantity: countUsers,
            }
        ];

        res.status(200).json({
            countByElement,
            user: users[users.length - 1],
            product: products[products.length - 1],
        });
    }
}

module.exports = indexController;