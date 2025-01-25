const validUser = async (req, res, next) => {
    try {
        let { name, lastname, email } = req.body
        if(!name){
            const error = new Error(`Type a name for the user`)
            error.statusCode = 404
            throw error
        }
        if(!lastname){
            const error = new Error(`Type a last name for the user`)
            error.statusCode = 404
            throw error
        }
        if(!email){
            const error = new Error(`Type a email for the user`)
            error.statusCode = 404
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default validUser