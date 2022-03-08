const express = require("express");
const app = express();
const path = require("path");
const routerProductCart = require("./routes/productCart")
const routeRegister = require('./routes/registerRouter');


app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use("/", routerProductCart)

app.get("/productDetail", (req, res) => {
  res.render("productDetail");
});
app.get("/listaproductos", (req, res) => {
  res.render("listaproductos");
});

app.use('/register', routeRegister);


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

app.listen(3030, () => console.log("Servidor Corriendo"));
