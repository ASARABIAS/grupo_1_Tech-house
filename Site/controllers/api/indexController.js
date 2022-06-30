const db = require("../../database/models");
const productsController = require('./productsController');
const usersController = require('./usersControllers');

const indexController = {
    list: async (req, res) => {
        const countProducts = await db.Products.count();
        const countUsers = await db.Users.count();

        const data = [
            {
                id: 0,
                title: "Productos",
                color: "primary",
                cuantity: countProducts,
                route:"products",
                endId: await productsController.end(),
            },
            {
                id: 1,
                title: "Usuarios",
                color: "success",
                cuantity: countUsers,
                route:"users",
                endId: await usersController.end(),
            },
            {
                id: -1,
                title: "Categorias",
                color: "danger",
                cuantity: await productsController.countCategory(),
                route:"products",
                endId: await productsController.end(),
            }
        ];

        res.status(200).json({
            status:200,
            data
        });
    }
}

module.exports = indexController;