const db = require("../../database/models");


const getProductCategories = async (categories) => {
    const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    let aux = [];
    let cuantity, indexColor = 0;
    for (let i = 0; i < categories.length; i++) {

        cuantity = await db.Products.count({ where: { id_category: categories[i].id } })

        aux.push({
            id: categories[i].id,
            title: categories[i].name,
            color: color[indexColor < color.length ? indexColor++ : indexColor = 0],
            cuantity: cuantity,
            icon: 'fa-award'
        });
    }
    return aux;
}

const getProductCollection = (products) => {
    let allProducts = products.map(product => {
        return {
            id: product.id,
            name: product.name,
            specifications: product.specifications,
            detail: `http://localhost:3030/api/products/${product.id}`,
            price: product.price,
            image : `http://localhost:3030/images/products/${product.images[0].image}`,
            category: product.categories.id,
        }
    })
    return allProducts;
}

const productsController = {
    list: async (req, res) => {
        const products = await db.Products.findAll({
            include: [
                { association: "images" },
                { association: "categories" }
            ]
        });
        const categories = await db.Categories.findAll()
        const productsByCategory = await getProductCategories(categories);
        const productsCollection = getProductCollection(products)
        const response = {
            count: products.length,
            countByCategory: productsByCategory,
            products: productsCollection,
            categories:categories
        }
        res.status(200).json(response)
    },
    detail: async (req, res) => {
        let id = req.params.id;
        let product = await db.Products.findByPk(id, {
            include: [
                { association: "images" },
                { association: "payment_methods" },
                { association: "categories" },
            ]
        });
        const image = `http://localhost:3030/images/products/${product.images[0].image}`
        const productResponse = { ...product.dataValues, imageUrl: image }
        res.status(200).json(productResponse)
    }
}

module.exports = productsController;