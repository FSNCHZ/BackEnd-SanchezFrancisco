const registerView = async (req, res, next) => {
    try {
        res.status(200).render("register")
    } catch (error) {
        next(error)
    }
}

export default registerView