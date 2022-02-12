const express = require("express");
const path = require('path');

const app = express();

app.use(express.static('public'));
//app.use('/static', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/home.html'));
});

app.listen(3030, () => console.log("Servidor Corriendo"));