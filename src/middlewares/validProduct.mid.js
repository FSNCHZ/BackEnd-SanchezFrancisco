const validProduct = async (req, res, next) => {
    try {
        let { title, stock, category } = req.body
        if(!title){
            const error = new Error(`Title needed`)
            error.statusCode = 404
            throw error
        }
        if(!stock){
            const error = new Error(`Price needed`)
            error.statusCode = 404
            throw error
        }
        if(!category){
            const error = new Error(`Category needed`)
            error.statusCode = 404
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default validProduct