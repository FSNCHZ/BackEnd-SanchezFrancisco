import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"

//Servidor

const server = express()
const PORT = 8080
const ready = () => console.log("Server ready on port " + PORT);
server.listen(PORT, ready)

//Middlewares

server.use(morgan("dev"))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//Router

server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)

