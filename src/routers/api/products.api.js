import { Router } from "express"
import { readOne, readAll, createProduct, createFakerProduct, updateProduct, deleteProduct } from "../../controllers/productsController.js"
import validProduct from "../../middlewares/validProduct.mid.js"

const productsRouter = Router()

productsRouter.get("/:pid", readOne)
productsRouter.get("", readAll)
productsRouter.post("", validProduct, createProduct)
productsRouter.put("/:pid", updateProduct)
productsRouter.delete("/:pid", deleteProduct)

export default productsRouter