const express = require("express");
const session = require("express-session");

const app = express();
const path = require("path");
const methodOverride = require('method-override');
const logMiddleware = require("./middlewares/loggedUser");
const cookies = require("cookie-parser");

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");


app.use(express.static("public"));

app.use(session({
    secret : 'topSecret',
    resave: true,
    saveUninitialized: true,
}));


app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(cookies());

//archivos Json para post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logMiddleware);

app.use('/', mainRouter);
app.use("/users", usersRouter);
app.use('/products', productsRouter);

app.listen(3030, () => console.log("Servidor Corriendo en el puerto 3030"));
