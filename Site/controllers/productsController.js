const path = require('path');
const fs = require('fs');

const productsJSONPath = path.join(__dirname, '../data/products.JSON');
let products = JSON.parse(fs.readFileSync(productsJSONPath, 'utf-8'));

const productsController = {
    addEditProduct: (req, res) => {
        res.render('products/add_editProduct');
    },
    //Acción de creación post
    create: function(req, res) {
        let newProducts = {
            id: Date.now(),
            nombre: req.body.nombre,
            precio: req.body.precio,
            descuento: req.body.descuento,
            categoria: req.body.categoria,
            cuotas: req.body.cuotas,
            especificaciones: req.body.especificaciones,
            image: req.body.image,
            tituloCaracteristica: req.body.tituloCaracteristica,
            subtitulo: req.body.subtitulo,
            descripcion: req.body.descripcion,
            garantia: req.body.garantia,
            mediosPago: req.body.mediosPago
        }

        products.unshift(newProducts)

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect("/products/listaProductos");

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