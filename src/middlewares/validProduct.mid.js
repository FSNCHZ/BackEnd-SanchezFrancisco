const validProduct = async (req, res, next) => {
    try {
        let { title } = req.body
        if(!title){
            const error = new Error(`Title needed`)
            error.statusCode = 404
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default validProduct