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
        
        let productosGuardados = fs.readFileSync('../data/products.json', 'utf-8');
        let products = [];

        if(productosGuardados != "" && productosGuardados != "[]"){
            products = JSON.parse(productosGuardados);
        }

        res.render('eliminar', { title: 'Eliminar usuario', producto: products.find(producto => producto.id == req.params.id) });
    
	}

    
}
module.exports = listaProductosController;
