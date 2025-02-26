import { Router } from "express";
import productsRouter from "./products.api.js"
import cartRouter from "./cart.api.js"
import usersRouter from "./users.api.js"

const apiRouter = Router()
const apiCb = (req, res) => res.status(200).send({ message: "API page"})

apiRouter.use("/products", productsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/carts", cartRouter)
apiRouter.use("", apiCb)

export default apiRouter