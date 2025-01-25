import fs from "fs/promises"
import { faker } from "@faker-js/faker"

let path = "./src/data/fs/files/users.json"

class UsersManager{
    constructor(){
        this.path = path
        this.init()
    }

    async init(){
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
            throw error
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

    async readUsers() {
        try {
            let users = await this.readFile()
            return users
        } catch (error) {
            throw error
        }
    }

    async readUser(uid){
        try {
            let users = await this.readFile()
            let user = users.find(u => u._id === uid)
            if(user == undefined){
                let error = new Error(`User with id: ${id}, does not exist`)
                error.statusCode = 404
                throw error
            }
            return user
        } catch (error) {
            throw error
        }
    }

    async createUser(data){
        try {
            const _id = faker.database.mongodbObjectId()
            const newUser = {
                _id,
                "name": data.name,
                "lastname": data.lastname,
                "email": data.email,
                "password": `${data.password ? data.password : "123456"}`,
                "age": data.age,
                "avatar": `${data.avatar ? data.avatar : faker.image.avatar()}`,
                "role": `${data.role ? data.role : faker.helpers.arrayElement(["user", "admin", "VIP"])}`
            }
            let fileData = await this.readFile()
            fileData.push(newUser)
            await this.writeFile(fileData)
            return newUser
        } catch (error) {
            throw error
        }
    }

    async deleteUser(uid){
        try {
            let users = await this.readFile()
            let index = users.findIndex(u => u._id === uid)
            if(index == -1){
                let error = new Error(`User with id: ${uid}, does not exist`)
                error.statusCode = 404
                throw error
            }
            let [deletedUser] = users.splice(index, 1)
            await this.writeFile(users)
            return deletedUser
        } catch (error) {
            throw error
        }
    }

    async updateUser(uid, data){
        try {
            let users = await this.readFile()
            let index = users.findIndex(u => u._id === uid)
            if(index == -1){
                let error = new Error(`User with id: ${uid}, does not exist`)
                error.statusCode = 404
                throw error
            }
            users[index] = { ...users[index], ...data }
            await this.writeFile(users)
            return users[index]
        } catch (error) {
            throw error
        }
    }
}

const usersManager = new UsersManager()
export default usersManager