import { Router } from "express";
import { addProductToCart, readProductsFromUser, removeProductFromCart, updateQuantity, totalToPay } from "../../controllers/cartsController.js";

const cartRouter = Router()

cartRouter.post("/", addProductToCart)
cartRouter.get("/users/:user_id", readProductsFromUser)
cartRouter.get("/total/:user_id", totalToPay)
cartRouter.delete("/:cart_id", removeProductFromCart)
cartRouter.put("/:cart_id", updateQuantity)

export default cartRouter