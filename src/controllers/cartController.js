import cartsManager from "../data/fs/CartsManager.js";
import productsManager from "../data/fs/ProductsManager.js";

const createCart = async (req, res, next) => {
    try {
        let newCart = await cartsManager.createCart()
        return res.status(201).json({ response: newCart })
    } catch (error) {
        next(error)
    }
}

const addProduct = async (req, res, next) => {
    try {
        let { cid, pid } = req.params
        let cart = await cartsManager.readCart(cid)
        let product = await productsManager.readOne(pid)
        let { _id } = product
        let quantity = 1
        let productToAdd = {
            _id,
            quantity
        }
        let exists = cart.products.some(e => e._id === _id)
        if(!exists){
            let newCart = await cartsManager.updateCart(cid, productToAdd)
            return res.status(200).json( {newCart} )
        } else{
            
        }
    }
    catch (error) {
        next(error)
    }
}

const readCart = async (req, res, next) => {
    try {
        let { cid } = req.params
        let cart = await cartsManager.readCart(cid)
        if(cart){
            return res.status(200).json({ response: cart })
        } else {
            let error = new Error(`Cart with id: ${cid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

export { readCart, addProduct, createCart }

