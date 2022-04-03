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

        products.forEach(product => {

            if (product.id === id) {

                product.name = body.name;
                product.specifications = body.specifications;
                product.characteristics = getCharacteristics(body);
                product.category = body.category;
                product.warrantyText = body.warrantyText;
                product.warrantyTime = body.warrantyTime;
                product.paymentMethod = body.paymentMethod;
                product.price = body.price;
                product.discount = body.discount;
            }

        });

        let ProductsJSON = JSON.stringify(products, null, ' ');

        fs.writeFileSync(JSONPath('products.json'), ProductsJSON);
        res.redirect('/products');
    },
    // lleva a un formulario donde se confirma que producto se eliminara
    viewDelete: function(req, res, next) {
        res.render('products/delete', { title: 'Eliminar producto', producto: products.find(producto => producto.id == req.params.id) });
    },

    //elimina el producto
    deleteProduct: function(req, res, next) {
        let id = req.params.id;
        products = products.filter(product => product.id != id);

        let ProductsJSON = JSON.stringify(products, null, ' ');
        fs.writeFileSync(JSONPath('products.json'), ProductsJSON);

        res.redirect('/products');
    }
}

function getCharacteristicsMain(subtitle, description) {
    let aux = [];
    for (let i = 0; i < subtitle.length; i++) {
        const mainSubtitle = subtitle[i];
        const mainDescription = description[i];

        aux.push({
            subtitle: mainSubtitle,
            description: mainDescription
        });
    }
    return aux;
}

function getCharacteristics(body) {

    let characteristicsTitle = body.characteristicsTitle;
    let aux = [];
    for (let i = 0; i < characteristicsTitle.length; i++) {
        const title = characteristicsTitle[i];

        if (body['characteristicsContextSubtitle_' + i] && body['characteristicsContextDescription_' + i]) {
            const subtitle = body['characteristicsContextSubtitle_' + i];
            const description = body['characteristicsContextDescription_' + i];

            aux.push({
                title: title,
                main: getCharacteristicsMain(subtitle, description)
            });
        }
    }
    return aux;
}


module.exports = productsController;