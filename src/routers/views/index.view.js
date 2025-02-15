import productsManager from "../../data/fs/ProductsManager.js"

const indexView = async (req, res, next) => {
    try {
        let all = await productsManager.readAll();
        let data = {
            title: "Products",
            products: all
        }
        return res.status(200).render("index", data)
    } catch (error) {
        next(error)
    }
}

export default indexView