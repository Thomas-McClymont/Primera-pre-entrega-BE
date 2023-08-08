import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import ProductManager from "./controllers/productManager.js";

import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";

const product = new ProductManager()
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Estructura handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"))

//Archivos estaticos
app.use("/", express.static(__dirname + "/public"))

app.get("/", async (req,res) => {
    let allProducts = await product.getProducts()
    res.render("home",{
        title:"Desafio Handlebars",
        products: allProducts
    })
})

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartRouter);

app.post("/products", async (req, res) => {
    let newProduct = req.body
    res.send(await product.writeProducts(newProduct))
})

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})