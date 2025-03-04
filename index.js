import "dotenv/config.js"
import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import connectMongo from "./src/helpers/mongo.helper.js";
import __dirname from "./utils.js"
import { engine } from "express-handlebars";
import { createServer } from "http"
import { Server as SocketServer} from "socket.io"
import socketHelper from "./src/helpers/socket.helper.js";

//Servidor Express

const server = express()
const PORT = process.env.SERVER_PORT //Variable de entorno .env que almacena el puerto del servidor
const ready = async () => {
    console.log("Server ready on port " + PORT);
    await connectMongo(process.env.MONGO_URL)
}
const httpServer = createServer(server)
httpServer.listen(PORT, ready)

//Servidor Socket

const socketServer = new SocketServer(httpServer)
socketServer.on("connection", socketHelper)
export { socketServer }

//Template engine

server.engine("handlebars", engine())
server.set("views", __dirname + "/src/views")
server.set("view engine", "handlebars")

//Middlewares

server.use(morgan("dev"))
server.use(express.static(__dirname + "/public"))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//Router

server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)