import cartsManager from "../../data/fs/CartsManager.js"

const cartView = async (req, res, next) => {
    try {
        const { uid } = req.params
        let cart = await cartsManager.readCart(uid)
        let data = {
            title: "Cart",
            products: cart.products
        }
        res.status(200).render("cart", data)
    } catch (error) {
        next(error)
    }
}

export default cartView