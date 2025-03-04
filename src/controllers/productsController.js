//import productsManager from "../data/fs/ProductsManager.js"
import productsManager from "../data/mongo/products.mongo.js"

const readOne = async (req, res, next) => {
    try {
        let { pid } = req.params
        let one = await productsManager.readById(pid)
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
        const { filter } = req.body
        let all = await productsManager.readAll(filter)
        if (all.length > 0) {
            return res.status(200).json({ all })
        } else {
            return res.status(404).json({ response: `There is no products to show` })
        }
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        let data = req.body
        let newProduct = await productsManager.create(data)
        return res.status(201).json({ response: newProduct })
    } catch (error) {
        next(error)
    }
}

const updateOne = async (req, res, next) => {
    try {
        let data = req.body
        let { pid } = req.params
        if ("_id" in data) {
            return res.status(400).json({ message: `Attention! product's id can't be changed` })
        }
        let one = await productsManager.updateById(pid, data)
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

const deleteOne = async (req, res, next) => {
    try {
        const { pid } = req.params
        let deleteProduct = await productsManager.deleteById(pid)
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

const paginate = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const { docs, nextPage, prevPage } = await productsManager.paginate(page || 1, limit || 5)
        return res.status(200).send({
            message: { docs, nextPage, prevPage }
        })
    } catch (error) {
        next(error)
    }
}

export { readOne, readAll, createProduct, updateOne, deleteOne, paginate }
