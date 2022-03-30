const path = require('path');
const fs = require('fs');

//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../data/products.json');


//Obtener objeto
let products = resultReadJSON(JSONPath('products.json'));
let paymentMethod = resultReadJSON(JSONPath('paymentMethod.json'));
let categoryProduct = resultReadJSON(JSONPath('categoryProduct.json'));

const productsController = {
    create: (req, res) => {
        res.render('products/createProduct', { paymentMethod, categoryProduct });
    },
    //Acción de creación post
    store: function(req, res) {

        req.body.characteristicsTitle = [req.body.characteristicsTitle];
        req.body.characteristicsContextSubtitle = [
            [req.body.characteristicsContextSubtitle]
        ];
        req.body.characteristicsContextDescription = [
            [req.body.characteristicsContextDescription]
        ];

        req.body.category = parseInt(req.body.category);
        req.body.warrantyTime = parseInt(req.body.warrantyTime);
        req.body.price = parseInt(req.body.price);
        req.body.descount = parseInt(req.body.descount);

        let newProduct = { id: Date.now(), ...req.body, images: ["prueba.png"], cuotas: "30x $30.400", color: ["Color"], envio: 4, valorDevolucion: 0 }
        products.push(newProduct);

        let ProductsJSON = JSON.stringify(products);

        fs.writeFileSync(JSONPath('products.json'), ProductsJSON);
        res.redirect('/products');

    },
    list: (req, res) => {

        res.render('products/listProducts', { products });

    },
    cart: (req, res) => {

        res.render("products/cartProduct")

    },
    detail: (req, res) => {

        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.render('products/detailProduct', { product, paymentMethod });
    },
    /* renderiza una lista con todos los productos con los botones editar y eliminar
    listaProductos: (req, res) => {
		
        
		res.render('products/listaProductos', {
			products,
			toThousand
		})
	},
    */
    // lleva a un formulario donde se confirma que producto se eliminara
    viewDelete: function (req, res, next) {
        
        let productosGuardados = fs.readFileSync(productsFilePath, 'utf-8');
        let products = [];

        if(productosGuardados != "" && productosGuardados != "[]"){
            products = JSON.parse(productosGuardados);
        }

        res.render('products/delete', { title: 'Eliminar producto', producto: products.find(producto => producto.id == req.params.id) });
    },

    //elimina el producto
    deleteProduct: function (req, res, next) {
        let productosGuardados = fs.readFileSync(productsFilePath, 'utf-8');
        let products = [];
        if (productosGuardados != "" && productosGuardados != "[]") {
            products = JSON.parse(productosGuardados);
        }
        let productoEliminado = products.find(producto => producto.id == req.params.id);
        let index = products.indexOf(productoEliminado);
        products.splice(index, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect('/');
    }
}




module.exports = productsController;