import { Router } from "express";
import { readCart, createCart, addProduct } from "../../controllers/cartController.js";

const cartRouter = Router()

cartRouter.post("", createCart)
cartRouter.post("/:cid/product/:pid", addProduct)
cartRouter.get("", readCart)

export default cartRouter