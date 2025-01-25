import { Router } from "express";
import { readUsers, readUser, createUser, updateUser, deleteUser } from "../../controllers/usersController.js"
import validUser from "../../middlewares/validUser.mid.js";

const usersRouter = Router()

usersRouter.get("", readUsers)
usersRouter.get("/:uid", readUser)
usersRouter.post("", validUser, createUser)
usersRouter.put("/:uid", updateUser)
usersRouter.delete("/:uid", deleteUser)

export default usersRouter