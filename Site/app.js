const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const cors = require('cors');
const jquery = require('jquery'); //requerir el jquery

const app = express();
const path = require("path");
const methodOverride = require('method-override');
const logMiddleware = require("./middlewares/loggedUser");
const userLogMiddleware = require("./middlewares/userLoggedIn");


const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

const apiProductsRouter = require("./routes/api/products");
const apiUsersRouter = require("./routes/api/users");
const apiIndexRouter = require("./routes/api/index");


app.use(express.static("public"));

app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true,
}));

app.use(cookies());

app.set("view engine", "ejs");
app.use(methodOverride('_method'));

//archivos Json para post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userLogMiddleware);
app.use(logMiddleware);

app.use('/', mainRouter);
app.use("/users", usersRouter);
app.use('/products', productsRouter);

app.use(cors());

app.use(apiProductsRouter);
app.use(apiUsersRouter);
app.use(apiIndexRouter);



app.listen(3030, () => console.log("Servidor Corriendo en el puerto 3030"));
