const path = require('path');
const fs = require('fs');

/*//Cargar productos del json
const productsJSONPath = path.join(__dirname, '../data/products.JSON');
let products = JSON.parse(fs.readFileSync(productsJSONPath, 'utf-8'));

//Cargar metodos de pago del json
const paymentMethodJSONPath = path.join(__dirname, '../data/paymentMethod.json');
let paymentMethod = JSON.parse(fs.readFileSync(paymentMethodJSONPath, 'utf-8'));

//Cargar categorias del json
const categoryProductJSONPath = path.join(__dirname, '../data/categoryProduct.json');
let categoryProduct = JSON.parse(fs.readFileSync(categoryProductJSONPath, 'utf-8'));
*/

//Cargar desde el archivo JSON
let JSONPath = (name)=>path.join(__dirname, '../data/'+name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let products=resultReadJSON(JSONPath('products.json'));
let paymentMethod=resultReadJSON(JSONPath('paymentMethod.json'));
let categoryProduct=resultReadJSON(JSONPath('categoryProduct.json'));

const productsController = {
    create: (req, res) => {
        res.render('products/createProduct',{paymentMethod,categoryProduct});
    },
    //Acción de creación post
    store: function(req, res) {

        let newProduct = {id:Date.now(),...req.body,image:"prueba.jpg"}
        products.push(newProduct);

        let ProductsJSON = JSON.stringify(products);

		fs.writeFileSync(JSONPath('productsCopy.json'), ProductsJSON);
        res.redirect('/products');

    },
    list: (req, res) => {

        res.render('products/listProducts',{products});

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