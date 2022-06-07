const path = require('path');
const fs = require('fs');

// Importando DB
const db = require("../database/models");
const Op = db.Sequelize.Op;

//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let products = resultReadJSON(JSONPath('products.json'));

const mainController = {

    // Productos y busqueda para usuarios no administrador y guest
    home: async(req, res) => {

        let query = req.query.search
        let products = [];

        if (query) {
            products = await db.Producto.findAll({
                where: {
                    name: {
                        [Op.like]: "%" + query + "%" }
                },
                include: [
                    { association: "images" },
                ]
            })
        } else {
            products = await db.Products.findAll({
                include: [
                    { association: "images" },
                ]
            })
        }

        let productsWithDiscount = products.filter(product => product.discount != 0);
        let productsWithoutDiscount = products.filter(product => product.discount == 0);

        console.log("productsWithDiscount:", productsWithDiscount);
        console.log("productsWithoutDiscount", productsWithoutDiscount);

        res.render('home', { productsWithDiscount, productsWithoutDiscount });
    },

}

module.exports = mainController;