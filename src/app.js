import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import ProductManager from "./controllers/productManager.js";

const product = new ProductManager()

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartRouter);

app.post("/products", async (req, res) => {
    let newProduct = req.body
    res.send(await product.writeProducts(newProduct))
})

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})