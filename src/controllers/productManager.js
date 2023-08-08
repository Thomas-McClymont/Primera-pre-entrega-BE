import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'

class ProductManager {
    constructor(){
        this.path = "./src/models/products.json"
    }
    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    writeProducts = async (product) => {
        let productsOld = await this.readProducts()
        let productAll = [...productsOld, product]
        await fs.writeFile(this.path,JSON.stringify(productAll))
        return "Product added";
    }
    exist = async (id) => {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }
    getProducts = async () => {
        return await this.readProducts()
    }
    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if(!productById) return "Product not found"
        return productById
    }
    addProducts = async (product) => {
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Product added"
    }
    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if(!productById) return "Product not found"
        let productsOld = await this.readProducts()
        let products = [{...product, id : id}, ...productsOld]
        await this.writeProducts(products)
        return "Product updated"
    }
    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existProducts = products.some(prod => prod.id === id)
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Product Deleted"
        }
        return "Product not found"
    }
}

export default ProductManager;