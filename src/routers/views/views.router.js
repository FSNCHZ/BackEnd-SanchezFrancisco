import { Router } from "express";
import indexView from "./index.view.js"
import productView from "./product.view.js"
import realTimeProductsView from "./realTimeProductsView.js";

const viewsRouter = Router()

viewsRouter.get("/", indexView)
viewsRouter.get("/products/:pid", productView)
viewsRouter.get("/realtimeproducts", realTimeProductsView)

export default viewsRouter