const realTimeProductsView = (req, res, next) => {
    try {
        res.status(200).render("realTimeProducts")
    } catch (error) {
        next(error)
    }
}

export default realTimeProductsView