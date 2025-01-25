import { faker } from "@faker-js/faker"
import fs from "fs/promises"

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

    async readFile(){
        try {
            let data = await fs.readFile(this.path)
            data = JSON.parse(data)
            return data
        } catch (error) {
            return data
        }
    }

    async writeFile(data){
        try {
            data = JSON.stringify(data, null, 2)
            await fs.writeFile(this.path, data)
        } catch (error) {
            throw error
        }
    }

    async createCart(){
        try {
            const cartsData = await this.readFile()
            const _id = faker.database.mongodbObjectId()
            const newCart = {
                _id,
                "products": []
            }
            cartsData.push(newCart)
            await this.writeFile(cartsData)
            return newCart
        } catch (error) {
            throw error            
        }
    }

    async updateCart(id, data){
        try {
            let cartsData = await this.readFile()
            let index = cartsData.findIndex(e=> e._id === id)
            if(index == -1){
                let error = new Error(`Cart with id: ${id}, does not exist`)
                error.statusCode = 404
                throw error
            }
            cartsData[index].products.push(data)
            await this.writeFile(cartsData)
            return cartsData
        } catch (error) {
            throw error
        }
    }

    async readCart(id){
        try {
            let cartsData = await this.readFile()
            let cart = cartsData.find(e => e._id === id)
            if(cart == undefined){
                let error = new Error(`Cart with id: ${id}, does not exist`)
                error.statusCode = 404
                throw error
            }
            return cart
        } catch (error) {
            throw error
        }
    }
}

let cartsManager = new CartsManager()

export default cartsManager