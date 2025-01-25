import productsManager from "../data/fs/ProductsManager.js"

const readOne = async (req, res, next) => {
    try {
        let { pid } = req.params
        let one = await productsManager.readOne(pid)
        if (one) {
            return res.status(200).json({ response: one })
        } else {
            const error = new Error(`Product with id: ${pid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const readAll = async (req, res, next) => {
    try {
        let all = await productsManager.readAll()
        if (all.length > 0) {
            return res.status(200).json({ all })
        } else {
            return res.status(200).json({response: `There is no products to show`})
        }
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        let data = req.body
        let newProduct = await productsManager.createProduct(data)
        return res.status(201).json({ response: newProduct })
    } catch (error) {
        next(error)
    }
}

const createFakerProduct = async (req, res, next) => {
    try {
        let newProduct = await productsManager.createFaker()
        return res.status(201).json({ response: newProduct })
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let data = req.body
        let { pid } = req.params
        if ("_id" in data) {
            return res.status(400).json({ message: `Attention! product's id can't be changed` })
        }
        let one = await productsManager.updateOne(pid, data)
        if (one) {
            return res.status(200).json({ response: one })
        } else {
            const error = new Error(`Product with id: ${pid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        let deleteProduct = await productsManager.deleteOne(pid)
        if (deleteProduct) {
            return res.status(200).json({ response: deleteProduct })
        } else {
            const error = new Error(`Product with id: ${pid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

export { readOne, readAll, createProduct, createFakerProduct, updateProduct, deleteProduct }