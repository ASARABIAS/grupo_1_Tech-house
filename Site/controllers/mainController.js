const path = require('path');
const fs = require('fs');
// Importando DB
const db = require("../database/models");

//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let products = resultReadJSON(JSONPath('products.json'));

const mainController = {
    home: async (req, res) => {
        let products = await db.Producto.findAll({
            include: [
                {association: "images"},
            ]
        })

        console.log(JSON.stringify(products, null, 2));

        let productsWithDiscount = products.filter(product => product.discount != 0);
        let productsWithoutDiscount = products.filter(product => product.discount == 0);

        res.render('home', { productsWithDiscount, productsWithoutDiscount });
    },

}

module.exports = mainController;