import cartsManager from "../data/mongo/carts.mongo.js"

const addProductToCart = async (req, res, next) => {
    try {
        const { user_id, product_id, quantity } = req.body
        const one = await cartsManager.addProductToCart(user_id, product_id, quantity)
        res.status(200).json({
            method: req.method,
            url: req.url,
            response: one
        })
    } catch (error) {
        next(error)
    }
}

const readProductsFromUser = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const all = await cartsManager.readProductsByUser(user_id)
        console.log(all)
        if (all.length > 0) {
            return res.status(200).json({
                method: req.method,
                url: req.url,
                response: all
            })
        } else {
            const error = new Error("Product not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const removeProductFromCart = async (req, res, next) => {
    try {
        const { cart_id } = req.params
        const one = await cartsManager.removeProductFromCart(cart_id)
        res.status(200).json({
            method: req.method,
            url: req.url,
            response: one
        })
    } catch (error) {
        next(error)
    }
}

const updateQuantity = async (req, res, next) => {
    try {
        const { cart_id } = req.params
        const { quantity } = req.body
        const one = await cartsManager.updateQuantity(cart_id, quantity)
        if (one) {
            return res.status(200).json({
                method: req.method,
                url: req.url,
                response: one
            })
        }
        const error = new Error("Product not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }
}

const totalToPay = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const total = await cartsManager.totalToPay(user_id)
        res.status(200).json({
            method: req.method,
            url: req.url,
            response: total
        })
    } catch (error) {
        next(error)
    }
}

export { addProductToCart, readProductsFromUser, removeProductFromCart, updateQuantity, totalToPay }

