const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const listaProductosController ={
    listaProductos: (req, res) => {
		let product = products.find(product => product.id == id)
        
		res.render('products/listaProductos', {
			product,
			toThousand
		})
	},
    delete : (req, res) => {
			const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			let idProduct = req.params.id
	
			let productosFiltrados = products.filter( product => product.id != idProduct)
	
			fs.writeFileSync( productsFilePath , JSON.stringify(productosFiltrados, null, 2))
	
			//res.redirect('/products')
		}
	}

    
    
    
}

module.exports = listaProductosController;
