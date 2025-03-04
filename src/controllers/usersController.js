//import usersManager from "../data/fs/UsersManager.js";
import usersManager from "../data/mongo/users.mongo.js"

const readUsers = async (req, res, next) => {
    try {
        const { filter } = req.body
        let users = await usersManager.readAll(filter)
        if (users.length > 0) {
            return res.status(200).json({ response: users })
        } else {
            return res.status(200).json({ response: `There is no products to show` })
        }
    } catch (error) {
        next(error)
    }
}

const readUser = async (req, res, next) => {
    try {
        let { uid } = req.params
        let user = await usersManager.readById(uid)
        if (user) {
            return res.status(200).json({ response: user })
        } else {
            let error = new Error(`User with id: ${uid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        let data = req.body
        let newUser = await usersManager.create(data)
        return res.status(201).json({ response: newUser })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        let { uid } = req.params
        let data = req.body
        let user = await usersManager.updateById(uid, data)
        if (user) {
            return res.status(200).json({ response: user })
        } else {
            let error = new Error(`User with id: ${uid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let { uid } = req.params
        let deletedUser = await usersManager.deleteById(uid)
        if(deletedUser){
            return res.status(200).json({ response: deletedUser })
        } else {
            let error = new Error(`User with id: ${uid}, does not exist`)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        next(error)
    }
}

export { readUsers, readUser, createUser, updateUser, deleteUser }