import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartRouter);
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})