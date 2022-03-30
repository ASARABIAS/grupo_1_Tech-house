const path = require('path');
const fs = require('fs');

//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

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

        let body = req.body;

        let newProduct = {
            id: Date.now(),
            name: body.name,
            specifications: body.specifications,
            characteristics: [{
                title: body.characteristicsTitle,
                main: [{
                    subtitle: body.characteristicsContextSubtitle,
                    description: body.characteristicsContextDescription
                }]
            }],
            category: body.category,
            warrantyText: body.warrantyText,
            warrantyTime: body.warrantyTime,
            paymentMethod: body.paymentMethod,
            price: body.price,
            discount: body.discount,
            images: ["prueba.png"],
            cuotas: "30x $30.400",
            color: ["Color"],
            envio: 4,
            valorDevolucion: 0
        }

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
    edit: (req, res) => {

        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.render('products/editProduct', { product, paymentMethod, categoryProduct });
    },
    update: (req, res) => {

        let body = req.body;
        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.send(body);
        console.log(body);

        //product = {
        //    name: body.name,
        //    specifications: body.specifications,
        //    characteristics:getcharacteristics(body),
        //    category: body.category,
        //    warrantyText: body.warrantyText,
        //    warrantyTime: body.warrantyTime,
        //    paymentMethod: body.paymentMethod,
        //    price: body.price,
        //    discount: body.discount,
        //    images: ["prueba.png"],
        //    cuotas: "30x $30.400",
        //    color: ["Color"],
        //    envio: 4,
        //    valorDevolucion: 0
        //}

        //let ProductsJSON = JSON.stringify(products);

        //fs.writeFileSync(JSONPath('products.json'), ProductsJSON);
        //res.redirect('/products');
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
    viewDelete: function(req, res, next) {

        let productosGuardados = fs.readFileSync(productsFilePath, 'utf-8');
        let products = [];

        if (productosGuardados != "" && productosGuardados != "[]") {
            products = JSON.parse(productosGuardados);
        }

        res.render('products/delete', { title: 'Eliminar producto', producto: products.find(producto => producto.id == req.params.id) });
    },

    //elimina el producto
    deleteProduct: function(req, res, next) {
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

function getcharacteristics(bodyCharacteristic) {
    [{
        title: body.characteristicsTitle,
        main: [{
            subtitle: body.characteristicsContextSubtitle,
            description: body.characteristicsContextDescription
        }]
    }]
}


module.exports = productsController;