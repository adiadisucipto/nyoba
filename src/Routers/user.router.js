const express = require("express")
const userRouter = express.Router()

const {getData, createData, updateData, deleteData} = require("../Handlers/user.handler")
const {isLogin, userRole} = require("../Middleware/authorization")

userRouter.get("/", isLogin, getData)

userRouter.post("/", createData)

userRouter.patch("/:id_user", updateData)

userRouter.delete("/:id_user", deleteData)

module.exports = userRouter