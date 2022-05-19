const path = require('path');
const fs = require('fs');
// Importando DB
const db = require("../database/models");

//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let products = resultReadJSON(JSONPath('products.json'));
// let paymentMethod = resultReadJSON(JSONPath('paymentMethod.json'));
// let categoryProduct = resultReadJSON(JSONPath('categoryProduct.json'));


const productsController = {

    // Formulario Creación Producto (GET)
    create: (req, res) => {
        db.Categoria.findAll()
            .then((categoryProduct) => {
                db.Metodo_pago.findAll()
                    .then((paymentMethod) => {
                        console.log(paymentMethod);
                        console.log(categoryProduct);
        res.render('products/createProduct', { paymentMethod, categoryProduct });
         })
    })
    },

    //Creación de un Producto (POST)
    store: function(req, res) {
        let body = req.body;
        db.Producto.create({
           name: body.name,
           specifications: body.specifications,
           characteristics: [{
               title: body.characteristicsTitle,
               principals: [{
                subtitle: body.characteristicsContextSubtitle_0,
                description: body.characteristicsContextDescription_0
            }]
           }
           ],
           id_category: body.category,
           warranty_text: body.warrantyText,
           warranty_time: body.warrantyTime,
           price: body.price,
           discount: body.discount,
           quota: "30x $30.400",
           shipping: 4,
           return_value: 0,
           images: [
               {image: "prueba.png"}
           ],
           colors:[
               {color: "Color"}
           ]
        },
        {
            include: [
                {association: "images"},
                {association: "colors"},
                {association: "characteristics", include: [
                    {association: "principals"}
                ]
            },
            ]
        })
            .then((product) => {
                let productsPaymentMethods = getMultipleData(body.paymentMethod);
                // Obteniendo el arreglo de objetos para el bulkCreate
                let productsPaymentMethodsDb = [];
                for (let i = 0; i < productsPaymentMethods.length; i++) {
                    productsPaymentMethodsDb.push({
                        id_product: product.id,
                        id_payment_method: productsPaymentMethods[i]
                    })                
                }
                db.Producto_pago.bulkCreate(
                    productsPaymentMethodsDb
                ).then((productPayment) => {
                    console.log(productPayment);
                    res.redirect("/")
                })  
            }).catch((err) => {
                console.error(err);
            });

        console.log(body);

    },

    // Lista de Productos
    list: (req, res) => {
        db.Producto.findAll({
            include: [
                {association: "images"},
                {association: "colors"},
                {association: "characteristics", include: [
                    {association: "principals"}
                ]
            },
            ]
        })
            .then(products => {
                
                res.render('products/listProducts', { products });
            })
            .catch(error => console.log(error));

    },
    cart: (req, res) => {

        res.render("products/cartProduct")

    },
    detail: (req, res) => {

        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.render('products/detailProduct', { product, paymentMethod });
    },
    edit: async (req, res) => {

        let id = req.params.id;
        let categoryProduct = await db.Categoria.findAll();
        let paymentMethod = await db.Metodo_pago.findAll();
        console.log(paymentMethod);
        let product = await db.Producto.findByPk(id, {
            include: [
                {association: "images"},
                {association: "colors"},
                {association: "metodo_pago"},
                {association: "characteristics", include: [
                    {association: "principals"}
                ]
                },
            ]
        });

        console.log(JSON.stringify(product, null, 2)); 

        res.render('products/editProduct', { product, paymentMethod, categoryProduct });
    },
    update: (req, res) => {

        let body = req.body;
        let id = req.params.id;

        products.forEach(product => {

            if (product.id == id) {

                product.name = body.name;
                product.specifications = body.specifications;
                product.characteristics = getCharacteristics(body);
                product.category = body.category;
                product.warrantyText = body.warrantyText;
                product.warrantyTime = body.warrantyTime;
                product.paymentMethod = getMultipleData(body.paymentMethod);
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

function getMultipleData(element) {
    let response = []

    if (Array.isArray(element)) {
        return element
    }

    if (typeof(element) === "string") {
        response.push(element)
    }
    return response
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

    let characteristicsTitle = getMultipleData(body.characteristicsTitle);
    let aux = [];
    for (let i = 0; i < characteristicsTitle.length; i++) {
        const title = characteristicsTitle[i];

        if (body['characteristicsContextSubtitle_' + i] && body['characteristicsContextDescription_' + i]) {
            const subtitle = body['characteristicsContextSubtitle_' + i];
            const description = body['characteristicsContextDescription_' + i];

            aux.push({
                title: title,
                main: getCharacteristicsMain(getMultipleData(subtitle), getMultipleData(description))
            });
        }
    }
    return aux;
}


module.exports = productsController;