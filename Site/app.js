const express = require("express");
const app = express();
const path = require("path");

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use('/', mainRouter);
app.use("/users", usersRouter);
app.use('/products', productsRouter);

app.listen(3030, () => console.log("Servidor Corriendo"));