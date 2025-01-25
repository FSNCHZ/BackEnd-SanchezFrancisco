import { faker } from "@faker-js/faker"
import fs from "fs/promises"

const path = "./src/data/fs/files/products.json"

function randomBoolean(){
    return Math.random() < 0.5
}

class ProductsManager {
    constructor() {
        this.path = path,
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
            throw error
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

    async createProduct(data) {
        try {
            //Se crea el id UNICO para cada producto
            const _id = faker.database.mongodbObjectId()
            //Se crea el producto con su id, y la data ingresada por el cliente
            const newProduct = {
                _id,
                ...data
            }
            //Se refiere el archivo donde se va a guardar el producto (readFile() retorna un array)
            const fileData = await this.readFile()
            //Se pushea el producto al array fileData
            fileData.push(newProduct)
            //Se sobreescribe el archivo con el nuevo array fileData (incluye a newProduct)
            await this.writeFile(fileData)
            return newProduct
        } catch (error) {
            throw error
        }
    }

    async createFaker() {
        try {
            let _id = faker.database.mongodbObjectId()
            let title = faker.commerce.productName()
            let description = faker.commerce.productDescription()
            let code = faker.string.alpha(10)
            let price = faker.commerce.price({ min: 10, max: 10000, dec: 1 })
            let status = randomBoolean()
            let stock = faker.number.int({ min: 0, max: 10000 })
            let category = faker.helpers.arrayElement([
                "remeras",
                "pantalones",
                "gorros",
                "calzado",
                "abrigos"
            ])
            const newProduct = {
                _id,
                title,
                description,
                code,
                price,
                status,
                stock,
                category
            }
            const all = await this.readFile()
            all.push(newProduct)
            await this.writeFile(all)
            return newProduct
        } catch (error) {
            throw error
        }
    }

    async readAll() {
        try {
            //Se lee el archivo, retorna un array con TODOS los productos
            let all = await this.readFile()
            //Se retornan todos los productos
            return all
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            //Array con todos los productos
            let all = await this.readFile()
            //Se filtra el array con el id del producto que se quiera mostrar
            let one = all.find(e => e._id === id)
            if (one == undefined) {
                const error = new Error(`Product with id: ${id}, does not exists`)
                error.statusCode = 404
                throw error
            }
            return one
        } catch (error) {
            throw error
        }
    }

    async deleteOne(id) {
        try {
            let all = await this.readFile()
            let index = all.findIndex(e => e._id === id)
            if (index == -1) {
                const error = new Error(`Product with id: ${id}, does not exist`)
                error.statusCode = 404
                throw error
            }
            let [deletedProduct] = all.splice(index, 1)
            await this.writeFile(all)
            return deletedProduct
        } catch (error) {
            throw error
        }
    }

    async updateOne(id, data) {
        try {
            let all = await this.readFile()
            let index = all.findIndex(e => e._id === id)
            if (index == -1) {
                const error = new Error(`Product with id: ${id}, does not exist`)
                error.statusCode = 404
                throw error
            }
            all[index] = { ...all[index], ...data }
            await this.writeFile(all)
            return all[index]
        } catch (error) {
            throw error
        }
    }
}

const productsManager = new ProductsManager()
export default productsManager