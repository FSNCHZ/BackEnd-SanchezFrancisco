import { faker } from "@faker-js/faker"
import fs from "fs/promises"
import usersManager from "./UsersManager.js"

let path = "./src/data/fs/files/carts.json"

class CartsManager {
    constructor() {
        this.path = path
        this.init()
    }

    async init() {
        try {
            await fs.access(this.path)
        } catch (error) {
            await fs.writeFile(this.path, JSON.stringify([]))
        }
    }

    async readFile() {
        try {
            let data = await fs.readFile(this.path)
            data = JSON.parse(data)
            return data
        } catch (error) {
            return data
        }
    }

    async writeFile(data) {
        try {
            data = JSON.stringify(data, null, 2)
            await fs.writeFile(this.path, data)
        } catch (error) {
            throw error
        }
    }

    async createCart(user_id) {
        try {
            const cartsData = await this.readFile()
            const _id = faker.database.mongodbObjectId()
            const newCart = {
                _id,
                user_id,
                "products": []
            }
            cartsData.push(newCart)
            await this.writeFile(cartsData)
            return newCart
        } catch (error) {
            throw error
        }
    }

    async updateCart(user_id, data) {
        try {
            //Leemos los datos de los usuarios para saber si existe el usuario con el user_id
            let usersData = await usersManager.readFile()
            let user = usersData.find(u => u.user_id == user_id)
            //Si no existe, retornamos un error
            if (!user) {
                let error = new Error(`User with id: ${user_id}, does not exist`)
                error.statusCode = 404
                throw error
            } else { //Si existe creamos o actualizamos el carrito segun el user_id
                //Traemos los carritos del archivo
                let cartsData = await this.readFile()
                //Buscamos si existe un carrito dado un user_id
                let cart = cartsData.findIndex(cart => cart.user_id == user_id)
                //Si no existe el carrito dado un user_id, lo creamos con ese user_id
                if (cart == -1) {
                    const newCart = await this.createCart(user_id)
                    newCart.products.push(data)
                    cartsData.push(newCart)
                    await this.writeFile(cartsData)
                    return newCart
                } else {
                    //Buscamos el indice del producto a actualizar
                    let productIndex = cart.products.findIndex(prod => prod._id == data._id)
                    //Si no existe, pusheamos el producto en productos[]
                    if(productIndex == -1) {
                        cart.products[productIndex].push({
                            _id: data._id,
                            title: data.title,
                            price: data.price,
                            quantity: data.quantity,
                            img: data.img
                        })
                    } else { //Si existe actualizamos la cantidad en productos[]
                        cart.products[productIndex].quantity += quantity
                    }
                    cartsData.push(cart)
                    await this.writeFile(cartsData)
                    return cart
                }
            }
        } catch (error) {
            throw error
        }
    }

    async readCart(user_id) {
        try {
            let cartsData = await this.readFile()
            const index = cartsData.findIndex(c => c.user_id == user_id)
            if( index == -1 ){
                let error = new Error(`Cart from user: ${user_id}, does not exist`)
                error.statusCode = 404
                throw error
            }
            return cartsData[index]
        } catch (error) {
            throw error
        }
    }
}

let cartsManager = new CartsManager()

export default cartsManager