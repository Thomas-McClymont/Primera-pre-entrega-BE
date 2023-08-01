import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './productManager.js'

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "Cart.json"
    }
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }
    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }
    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }
    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if(!cartById) return "Cart not found"
        return cartById
    }
    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id :id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Cart added"
    }
    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "Cart not found"
        let productById = await productAll.exist(productId)
        if(!cartById) return "Product not found" //carts?
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)
        if(cartById.products.some(prod => prod.id === productId)) {
            let moreProductInCart = cartById.products.find(prod => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Product added"
        }
        cartById.products.push({id:productById.id, cantidad: 1})
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Product added"
    }
}

export default CartManager