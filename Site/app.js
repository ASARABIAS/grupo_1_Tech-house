const express = require("express");
const path = require('path');

const app = express();

app.use(express.static('public'));
//app.use('/static', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/home.html'));
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve('./views/productCart.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve('./views/registro.html'));
});
app.listen(3030, () => console.log("Servidor Corriendo"));