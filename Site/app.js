const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const routerListaProductos = require("./routes/listaProductos");


app.use(express.static("public"));


app.set("view engine", "ejs");
app.use(methodOverride('_method'));

//archivos Json para post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', mainRouter);
app.use("/users", usersRouter);
app.use('/products', productsRouter);
app.use("/listaProductos", routerListaProductos)
app.listen(3030, () => console.log("Servidor Corriendo en el puerto 3030"));
