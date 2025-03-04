import { socketServer } from "../../index.js";
import productsManager from "../data/fs/ProductsManager.js";
import usersManager from "../data/fs/UsersManager.js";

async function socketHelper(socket){
    console.log(socket.id)
    const products = await productsManager.readAll()
    socket.emit("products", products)
    socket.on("newProduct", async data=> {
        await productsManager.createProduct(data)
        const products = await productsManager.readAll()
        socketServer.emit("products", products)
    })

    socket.on("newUser", async data=> {
        await usersManager.createUser(data)
    })
}

export default socketHelper