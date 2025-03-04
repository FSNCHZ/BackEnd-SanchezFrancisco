import { Router } from "express";
import indexView from "./index.view.js"
import productView from "./product.view.js"
import realTimeProductsView from "./realTimeProductsView.js";
import registerView from "./register.view.js"
import cartView from "./cart.view.js"

const viewsRouter = Router()

viewsRouter.get("/", indexView)
viewsRouter.get("/products/:pid", productView)
viewsRouter.get("/realtimeproducts", realTimeProductsView)
viewsRouter.get("/carts/:uid", cartView)
viewsRouter.get("/register", registerView)

export default viewsRouter