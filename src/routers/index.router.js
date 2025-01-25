import { Router } from "express"
import apiRouter from "./api/index.api.js"

const router = Router()
const indexCb = (req, res) => res.status(200).send({ message: "Welcome to the API" })

router.use("/api", apiRouter)
router.use("", indexCb)

export default router
