const productsController ={
    addEditProduct: (req,res) =>{
        res.render('products/add_editProduct');
    },
    listaProductos: (req,res) =>{
        res.render('products/listaProductos');
    },
    productCart: (req,res) => {
        res.render("products/productCart")
    },
    productDetail: (req,res) =>{
        res.render('products/productDetail');
    },
}

module.exports = productsController;