const db = require("../../database/models");
const { Op } = require("sequelize");

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
            detail: `http://localhost:3030/api/products/${product?.id}`,
            price: product.price,
            discount: product.discount,
            image: `http://localhost:3030/images/products/${product?.images[0].image}`,
            category: product.categories.id,
        }
    })
    return allProducts;
}

const productsController = {
    list: async (req, res) => {
        let pageNumber = req.query.page;
        const category = req.query.category;
        const discount = req.query.discount;
        const itemsPerPage = req.query.itemsperpage ? parseInt(req.query.itemsperpage) : 6;
        console.log("itemsPerPage: ",itemsPerPage);
        const queryOptions = {
            include: [
                { association: "images" },
                { association: "categories" }
            ]
        }
        if (category) {
            queryOptions.where = {
                id_category: category
            }
        }
        if (discount==1) {
            queryOptions.where = {
                ...queryOptions.where,
                discount: {
                    [Op.gt]: 0
                }
            }
        }
        
        if(discount==0){
            queryOptions.where = {
                ...queryOptions.where,
                discount: 0
            }
        }
        let maxPages;
        if (pageNumber && pageNumber > 0) {
            pageNumber = parseInt(pageNumber);
            const totalProducts = await db.Products.count(queryOptions);
            maxPages = Math.ceil(totalProducts / itemsPerPage);

            if (pageNumber > maxPages) {
                pageNumber = maxPages;
            }
            if (totalProducts > 0) {
                queryOptions.limit = itemsPerPage;
                queryOptions.offset = itemsPerPage * (pageNumber - 1);
            }
        }
        const products = await db.Products.findAll(queryOptions);
        const categories = await db.Categories.findAll()
        const productsByCategory = await getProductCategories(categories);
        const productsCollection = getProductCollection(products)
        const response = {
            count: products.length,
            countByCategory: productsByCategory,
            products: productsCollection
        }

        if (pageNumber >= 0) {
            response.pages = {
                current: pageNumber,
                next: pageNumber < maxPages ? pageNumber + 1 : null,
                previous: pageNumber == 1 || pageNumber == 0 ? null : pageNumber - 1,
                total: maxPages
            }
        }
        res.status(200).json(response)
    },
    detail: async (req, res) => {
        const { id } = req.params;
        const product = await db.Products.findByPk(id, {
            include: [
                { association: "images" },
                { association: "payment_methods" },
                { association: "categories" },
            ]
        });
        let response, status;

        if (product) {
            const image = `http://localhost:3030/images/products/${product.images[0].image}`;
            status = 200;
            response = {
                status,
                data: {
                    ...product.dataValues, imageUrl: image
                }
            }
        } else {
            status = 501;
            response = {
                status,
                data: "Producto no Encontrado en la base de datos"
            }
        }

        res.status(status).json(response)
    },

    end: async () => await db.Products.max('id'),

    countCategory: async () => await db.Categories.count(),

}

module.exports = productsController;