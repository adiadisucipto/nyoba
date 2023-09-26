const express = require("express")
const userRouter = express.Router()

const {getData, createData, updateData, deleteData} = require("../Handlers/user.handler")
const {isLogin, userRole} = require("../Middleware/authorization")

userRouter.get("/", isLogin, userRole, getData)

userRouter.post("/", createData)

userRouter.patch("/:id_user", isLogin, userRole, updateData)

userRouter.delete("/:id_user", isLogin, userRole, deleteData)

module.exports = userRouter