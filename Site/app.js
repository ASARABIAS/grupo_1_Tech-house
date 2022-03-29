const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');

// Requires routes
const routerProductCart = require("./routes/productCart");
const routeRegister = require('./routes/registerRouter');
const routerHome = require("./routes/home");
const routerlogin = require("./routes/login");
const routerproductDetail = require("./routes/productDetail");
const routerAddEditProduct = require("./routes/addEditProduct");
const routerListaProductos = require("./routes/listaProductos");
//const routerDelete = require("./routes/delete");


// ************ Middlewares - (don't touch) ************
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

// ************ Route System require and use() ************
app.use('/', routerHome);
app.use('/login', routerlogin);
app.use("/productCart", routerProductCart);
app.use("/productDetail", routerproductDetail)
app.use("/add_editProduct", routerAddEditProduct)
app.use("/listaProductos", routerListaProductos)
app.use('/register', routeRegister);
//app.use('/delete', routerDelete);

app.listen(3030, () => console.log("Servidor Corriendo"));

/*
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/users/home.ejs'));
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve('./views/users/productCart.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/users/login.html'));
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve('./views/users/productDetail.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve('./views/users/registro.html'));
});*/