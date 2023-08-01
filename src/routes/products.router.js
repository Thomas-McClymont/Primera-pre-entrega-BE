import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const productsRouter = Router();
const product = new ProductManager();

productsRouter.get("/", async (req, res) => {
    const products = product.getProducts();
    let {limit} = req.query;
    res.send(await ({products:limit ? products.slice(0, limit) : products}));
});

productsRouter.get("/:pid", async (req, res) => {
    const products = product.getProducts();
    let id = Number(req.params.id)
    res.send(await({product:products.find(item => item.id === pid) || "Error! El ID de Producto no existe!"}))
})

productsRouter.post("/", async (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
        return false;
    }
    if (!description) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
        return false;
    }
    if (!code) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
        return false;
    }
    if (!price) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
        return false;
    }
    if (!category) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
        return false;
    }
    if (!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
        return false;
    }
    if (product.addProducts({title, description, code, price, status, stock, category, thumbnails})) {
        res.send({status:"ok", message:"El Producto se agregó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo agregar el Producto!"});
    }
})

productsRouter.put("/:pid", async (req, res) => {
    let id = Number(req.params.id);
    let {title, description, code, price, status, stock, category, thumbnails} = req.body
    if (!title) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
        return false;
    }
    if (!description) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
        return false;
    }
    if (!code) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
        return false;
    }
    if (!price) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
        return false;
    }
    if (!category) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
        return false;
    }
    if (!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
        return false;
    }
    if (product.updateProducts (id, {title, description, code, price, status, stock, category, thumbnails})) {
        res.send({status:"ok", message:"El Producto se actualizó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo actualizar el Producto!"});
    }
})

productsRouter.delete("/:pid", async (req, res) => {
    let id = Number(req.params.id);

    if (product.deleteProducts(id)) {
        res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
    }
})

export default productsRouter;