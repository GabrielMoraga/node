const express = require("express");
const app = express();
const PORT = 8080;

const Contenedor = require('./Contenedor.js');
let contenedor = new Contenedor('./productos.txt');


(async () => {

let productos = await contenedor.getAll();

app.get("/", (req, res, next) => {
    res.send("<h1>Hola desde Express!</h1>")
})


app.get("/productos", (req, res, next) => {
    res.json(productos)

});


let random = Math.floor(Math.random() * 3);
app.get("/productoRandom", (req, res, next) => {
    res.json(productos[random])

});

})();


const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(error))