const express = require("express")
const mainRouter = express.Router()

const userRouter = require("./user.router")
const promoRouter = require("./promo.router")
const orderRouter = require("./order.router")
const productRouter = require("./product.router")

mainRouter.use("/user", userRouter)
mainRouter.use("/promo", promoRouter)
mainRouter.use("/order", orderRouter)
mainRouter.use("/product", productRouter)

module.exports = mainRouter