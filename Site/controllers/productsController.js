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
// let paymentMethod = resultReadJSON(JSONPath('paymentMethod.json'));
// let categoryProduct = resultReadJSON(JSONPath('categoryProduct.json'));


const productsController = {

    // Formulario Creación Producto (GET)
    create: (req, res) => {
        db.Categories.findAll()
            .then((categoryProduct) => {
                db.paymentMethod.findAll()
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
        let file = req.file;

        db.Products.create({
                name: body.name,
                specifications: body.specifications,
                //characteristics: getCharacteristics(body),
                id_category: body.category,
                warranty_text: body.warrantyText,
                price: body.price,
                discount: body.discount,
                shipping: 4,
                return_value: 0,
                images: [
                    { image: !file ? "prueba.png" : file.filename }
                ],
            }, {
                include: [
                    { association: "images" },
                    /*
                    {
                        association: "characteristics",
                        include: [
                            { association: "principals" }
                        ]
                    },
                    */
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
                db.paymentMethod.bulkCreate(
                    productsPaymentMethodsDb
                ).then((productPayment) => {
                    res.redirect("/products")
                })
            }).catch((err) => {
                console.error(err);
            });
    },
    // Lista de Productos y busqueda para usuarios administradores
    list: (req, res) => {

        let query = req.query.search

        console.log(req.query);

        if (query) {
            db.Products.findAll({
                    where: {
                        name: {
                            [Op.like]: "%" + query + "%"
                        }
                    },
                    include: [
                        { association: "images" },
                        /*{ association: "colors" },
                        {
                            association: "characteristics",
                            include: [
                                { association: "principals" }
                            ]
                        },
                        */
                    ]
                })
                .then(products => {

                    res.render('products/listProducts', { products });
                })
                .catch(error => console.log(error));
        } else {
            db.Products.findAll({
                    include: [
                        { association: "images" },
                        /*{ association: "colors" },
                        {
                            association: "characteristics",
                            include: [
                                { association: "principals" }
                            ]
                        },
                        */
                    ]
                })
                .then(products => {

                    res.render('products/listProducts', { products });
                })
                .catch(error => console.log(error));
        }


    },
    cart: (req, res) => {

        res.render("products/cartProduct")

    },

    // Detalle del producto
    detail: async(req, res) => {

        let id = req.params.id;
        let paymentMethod = await db.Payment_methods.findAll();
        let product = await db.Products.findByPk(id, {
            include: [
                { association: "images" },
                { association: "Payment_methods" },
                /*{ association: "colors" },
                {
                    association: "characteristics",
                    include: [
                        { association: "principals" }
                    ]
                },
                */
            ]
        });

        res.render('products/detailProduct', { product, paymentMethod });
    },

    // Vista editar Producto
    edit: async(req, res) => {

        let id = req.params.id;
        let categoryProduct = await db.Categoria.findAll();
        let paymentMethod = await db.Metodo_pago.findAll();
        let product = await db.Producto.findByPk(id, {
            include: [
                { association: "images" },
                { association: "metodo_pago" },
                /*{ association: "colors" },
                {
                    association: "characteristics",
                    include: [
                        { association: "principals" }
                    ]
                },
                */
            ]
        });

        //console.log(JSON.stringify(product, null, 2)); 
        res.render('products/editProduct', { product, paymentMethod, categoryProduct });
    },

    // Editar Producto 
    update: async(req, res) => {
        let body = req.body;
        let file = req.file;

        //Actualizo campos directos de la tabla, los que vengan desde el form
        await db.Producto.update({
            name: body.name,
            specifications: body.specifications,
            id_category: body.category,
            warranty_text: body.warrantyText,
            price: body.price,
            discount: body.discount,
        }, {
            where: { id: req.params.id }
        });

        // Obtengo producto con los datos actualizados de la tabla directa Producto
        let updatedProduct = await db.Producto.findByPk(req.params.id, {
            // Me trae info asociada a estas dos tablas
            /*
            include: [{
                association: "characteristics",
                include: [ 
                    { association: "principals" }
                ]
            }, ]
            */
        });
        /*
        if (updatedProduct.characteristics.length > 0) {
            
            for (let i = 0; i < updatedProduct.characteristics.length; i++) {
                await db.Principal.destroy({
                    where: {
                        id_characteristic: updatedProduct.characteristics[i].id
                    }
                })

            }

            await db.Caracteristica.destroy({
                where: {
                    id_product: updatedProduct.id
                },
                force: true
            });

            // Ingreso la nueva caracteristica
            let characteristicsTitle = getMultipleData(body.characteristicsTitle);
            for (let i = 0; i < characteristicsTitle.length; i++) {
                const title = characteristicsTitle[i];

                if (body['characteristicsContextSubtitle_' + i] && body['characteristicsContextDescription_' + i]) {
                    const subtitle = body['characteristicsContextSubtitle_' + i];
                    const description = body['characteristicsContextDescription_' + i];

                    await db.Caracteristica.create({
                        id_product: updatedProduct.id,
                        title: title,
                        principals: getCharacteristicsMain(getMultipleData(subtitle), getMultipleData(description))
                    }, {
                        include: [
                            { association: "principals" }
                        ]
                    });
                }
            }

        }
        */
        // Borrando datos de la tabla intermedia
        await db.Producto_pago.destroy({
            where: {
                id_product: updatedProduct.id
            }
        });

        // Creando arreglo por los checkbox del formulario
        let productsPaymentMethods = getMultipleData(body.paymentMethod);

        let productsPaymentMethodsDb = []; // Espera un arreglo de objetos
        for (let i = 0; i < productsPaymentMethods.length; i++) {
            productsPaymentMethodsDb.push({
                id_product: updatedProduct.id,
                id_payment_method: productsPaymentMethods[i]
            })
        }

        await db.Producto_pago.bulkCreate(
            productsPaymentMethodsDb
        );

        if (file) {
            await db.Imagen.destroy({
                where: {
                    id_product: updatedProduct.id
                }
            });
            await db.Imagen.create({
                image: file.filename,
                id_product: updatedProduct.id,
            })
        }

        res.redirect('/products');
    },
    // Vista eliminar producto
    viewDelete: async(req, res, next) => {
        let id = req.params.id;
        let product = await db.Producto.findByPk(id);

        res.render('products/delete', { title: 'Eliminar producto', product });
    },

    // Eliminar producto
    deleteProduct: async(req, res, next) => {

        let deletedProduct = await db.Producto.findByPk(req.params.id, {
            /*
            include: [{
                association: "characteristics",
                include: [
                    { association: "principals" }
                ]
            }, ]
            */
        })

        /*
        if (deletedProduct.characteristics.length > 0) {
            for (let i = 0; i < deletedProduct.characteristics.length; i++) {
                await db.Principal.destroy({
                    where: {
                        id_characteristic: deletedProduct.characteristics[i].id
                    }
                })
            }

            await db.Caracteristica.destroy({
                where: {
                    id_product: deletedProduct.id
                },
                force: true
            });
        };
        */

        await db.Producto_pago.destroy({
            where: {
                id_product: deletedProduct.id
            }
        });

        await db.Imagen.destroy({
            where: {
                id_product: deletedProduct.id
            }
        });

        await db.Producto.destroy({
            where: {
                id: deletedProduct.id
            }
        })

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
    console.log('main:', aux);
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
                principals: getCharacteristicsMain(getMultipleData(subtitle), getMultipleData(description))
            });
        }
    }
    return aux;
}

module.exports = productsController;