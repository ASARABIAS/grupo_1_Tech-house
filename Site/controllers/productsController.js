const productsController ={
    addProduct: (req,res) =>{
        res.render('products/add_editProduct');
    },
    //Acción de creación post
    create: function (req,res){
        let products={
        name: req.body.name,
        specifications: req.body.specifications,
        title: req.body.title,
        Subtitulo: req.body.Subtitulo,
        Descripcion: req.body.Descripcion,
        category: req.body.category,
        Garantia: req.body.Garantia,
        mastercad: req.body.mastercad,
        visa: req.body.visa,
        efecty: req.body.efecty,
        price: req.body.price,  
        descount: req.body.descount
        }
        // res.send(req.body)
        res.redirect("/products/listaProductos");
         
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