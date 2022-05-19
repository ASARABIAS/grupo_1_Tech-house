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

    // Detalle del producto
    detail: async (req, res) => {

        let id = req.params.id;
        let paymentMethod = await db.Metodo_pago.findAll();
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
        
        res.render('products/detailProduct', { product, paymentMethod });
    },

    // Vista editar Producto
    edit: async (req, res) => {

        let id = req.params.id;
        let categoryProduct = await db.Categoria.findAll();
        let paymentMethod = await db.Metodo_pago.findAll();
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

        //console.log(JSON.stringify(product, null, 2)); 
        res.render('products/editProduct', { product, paymentMethod, categoryProduct });
    },

    // Editar Producto 
    update: async (req, res) => {
        let body = req.body;

        await db.Producto.update({
            name: body.name,
            specifications: body.specifications,
            id_category: body.category,
            warranty_text: body.warrantyText,
            warranty_time: body.warrantyTime,
            price: body.price,
            discount: body.discount,
         },
         {
            where: {id: req.params.id}
         });

         let updatedProduct = await db.Producto.findByPk(req.params.id, {
            include: [
                {association: "characteristics", include: [
                    {association: "principals"}
                ]
                },
            ]
        });
        
        if(updatedProduct.characteristics.length > 0){
            await db.Principal.destroy({
                where: {
                    id_characteristic: updatedProduct.characteristics[0].id
                }
            })
    
            await db.Caracteristica.destroy({
                where: {
                    id_product: updatedProduct.id
                },
                force: true
            });
    
            await db.Caracteristica.create({
                id_product: updatedProduct.id,
                title: body.characteristicsTitle,
                principals: [{
                 subtitle: body.characteristicsContextSubtitle_0,
                 description: body.characteristicsContextDescription_0
             }]
            }, {
                include: [
                    {association: "principals"}
                ]
            })
        }
      
         await db.Producto_pago.destroy({
             where: {
                id_product: updatedProduct.id
             }
         });

        let productsPaymentMethods = getMultipleData(body.paymentMethod);

        let productsPaymentMethodsDb = [];
        for (let i = 0; i < productsPaymentMethods.length; i++) {
            productsPaymentMethodsDb.push({
                id_product: updatedProduct.id,
                id_payment_method: productsPaymentMethods[i]
            })                
        }

        await db.Producto_pago.bulkCreate(
            productsPaymentMethodsDb
        ); 

         res.redirect('/products');
    },
    // Vista eliminar producto
    viewDelete: async (req, res, next) => {
        let id = req.params.id;
        let product = await db.Producto.findByPk(id);

        res.render('products/delete', { title: 'Eliminar producto', product });
    },

    // Eliminar producto
    deleteProduct: async (req, res, next) => {

        let deletedProduct = await db.Producto.findByPk(req.params.id, {
            include: [
                {association: "characteristics", include: [
                    {association: "principals"}
                ]
                },
            ]
        })  

        if(deletedProduct.characteristics.length > 0){
            await db.Principal.destroy({
                where: {
                    id_characteristic: deletedProduct.characteristics[0].id
                }
            })
    
            await db.Caracteristica.destroy({
                where: {
                    id_product: deletedProduct.id
                },
                force: true
            });
        }
      
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

         await db.Color.destroy({
            where: {
                id_product: deletedProduct.id
            }
        });

        await db.Producto.destroy({
            where:{
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