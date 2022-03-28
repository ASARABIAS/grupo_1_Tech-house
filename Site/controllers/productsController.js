const path = require('path');
const fs = require('fs');

const productsJSONPath = path.join(__dirname, '../data/products.JSON');
let products = JSON.parse(fs.readFileSync(productsJSONPath, 'utf-8'));

const productsController = {
    addEditProduct: (req, res) => {
        res.render('products/add_editProduct');
    },
    listaProductos: (req, res) => {
        res.render('products/listaProductos');
    },
    productCart: (req, res) => {
        res.render("products/productCart")
    },
    productDetail: (req, res) => {
        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.render('products/productDetail', { product, index: 0 });
    },
}

module.exports = productsController;