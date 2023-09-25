const express = require("express")
const authRouter = express.Router()

const {createUser, loginUser} = require("../Handlers/auth.handler")

authRouter.post("/register", createUser)
authRouter.post("/login", loginUser)

module.exports = authRouter