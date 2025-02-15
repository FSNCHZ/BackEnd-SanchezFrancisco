import productsManager from "../../data/fs/ProductsManager.js"

const productView = async (req, res, next) => {
    try {
        const { pid } = req.params
        const product = await productsManager.readOne(pid)
        const data = {
            title: `${product.title}`,
            product: product
        }
        return res.status(200).render("product", data)
    } catch (error) {
        next(error)
    }
}

export default productView