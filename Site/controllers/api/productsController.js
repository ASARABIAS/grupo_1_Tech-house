const db = require("../../database/models");

const getProductCategories = (products, categories) => {
    let response = {}
    for (let i = 0; i < categories.length; i++) {
        response[categories[i].name] = products.filter(product => {
           return product.id_category === categories[i].id
        }).length
    }
    return response
}

const getProductCollection = (products) => {
    let allProducts = products.map(product => {
        return {
            id: product.id,
            name: product.name,
            specifications: product.specifications,
            detail: `http://localhost:3030/api/products/${product.id}`
        }
    })
    return allProducts
}

const productsController = {
    list: async(req,res) => {
        let products = await db.Products.findAll({
            include: [
                { association: "images" },
            ]
        });
        let categories = await db.Categories.findAll()
        const productsByCategory = getProductCategories(products, categories);
        const productsCollection = getProductCollection(products)
        const response = {
            count: products.length,
            countByCategory: productsByCategory,
            products: productsCollection,
        }
        res.status(200).json(response)
    },
    detail: async(req,res) => {
        let id = req.params.id;
        let product = await db.Products.findByPk(id, {
            include: [
                { association: "images" },
                { association: "payment_methods" },
                { association: "categories" },
            ]
        });
        const image = `http://localhost:3030/images/products/${product.images[0].image}`
        const productResponse = {...product.dataValues, imageUrl: image}
        res.status(200).json(productResponse)
    }
}

module.exports = productsController;