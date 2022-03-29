const path = require('path');
const fs = require('fs');

const productsJSONPath = path.join(__dirname, '../data/products.JSON');
let products = JSON.parse(fs.readFileSync(productsJSONPath, 'utf-8'));

const productsController = {
    add: (req, res) => {
        res.render('products/addProduct');
    },
    //Acción de creación post
    create: function(req, res) {
        res.send(req.body);
        //let newProducts = {
        //    id: Date.now(),
        //    nombre: req.body.nombre,
        //    precio: req.body.precio,
        //    descuento: req.body.descuento,
        //    categoria: req.body.categoria,
        //    cuotas: req.body.cuotas,
        //    especificaciones: req.body.especificaciones,
        //    image: req.body.image,
        //    tituloCaracteristica: req.body.tituloCaracteristica,
        //    subtitulo: req.body.subtitulo,
        //    descripcion: req.body.descripcion,
        //    garantia: req.body.garantia,
        //    mediosPago: req.body.mediosPago
        //}
        //
        //products.unshift(newProducts)
        //
        //let productsJSON = JSON.stringify(products);
        //
        //fs.writeFileSync(productsFilePath, productsJSON);
        //res.redirect("products/listProducts");

    },
    list: (req, res) => {
        res.render('products/listProducts');
    },
    cart: (req, res) => {
        res.render("products/cartProduct")
    },
    detail: (req, res) => {
        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.render('products/detailProduct', { product, index: 0 });
    },
}

module.exports = productsController;