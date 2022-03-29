const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const listaProductosController ={
    listaProductos: (req, res) => {
		
        
		res.render('products/listaProductos', {
			products,
			toThousand
		})
	},
	viewDelete: function (req, res, next) {
        
        let productosGuardados = fs.readFileSync(productsFilePath, 'utf-8');
        let products = [];

        if(productosGuardados != "" && productosGuardados != "[]"){
            products = JSON.parse(productosGuardados);
        }

        res.render('products/eliminar', { title: 'Eliminar producto', producto: products.find(producto => producto.id == req.params.id) });
    },
    deleteProduct: function (req, res, next) {
        console.log("Se eliminó el producto " + req.body.id);

        let productossGuardados = fs.readFileSync(productsFilePath, 'utf-8');

        let products = [];

        if(productossGuardados != ""){
            usuarios = JSON.parse(productossGuardados);
        }

        let producto = products.find(producto => producto.id == req.body.id);

        products.splice(products.indexOf(producto), 1);

        fs.writeFileSync(productsFilePath, JSON.stringify(products));

        res.redirect('/');
    }
}
module.exports = listaProductosController;
