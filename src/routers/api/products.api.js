import { Router } from "express"
import { readOne, readAll, createProduct, updateOne, deleteOne, paginate } from "../../controllers/productsController.js"
import validProduct from "../../middlewares/validProduct.mid.js"

const productsRouter = Router()

productsRouter.get("", readAll)
productsRouter.post("", validProduct, createProduct)
productsRouter.get("/pages", paginate)
productsRouter.put("/:pid", updateOne)
productsRouter.get("/:pid", readOne)
productsRouter.delete("/:pid", deleteOne)

export default productsRouter