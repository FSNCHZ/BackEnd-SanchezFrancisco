const validUser = async (req, res, next) => {
    try {
        let { email, password } = req.body
        if(!email){
            const error = new Error(`Type a email for the user`)
            error.statusCode = 400
            throw error
        }
        if (!password) {
            const error = new Error(`Type a password for the user`)
            error.statusCode = 400
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default validUser