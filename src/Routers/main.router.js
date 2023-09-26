const express = require("express")
const mainRouter = express.Router()
const multer = require("multer")

const userRouter = require("./user.router")
const promoRouter = require("./promo.router")
const orderRouter = require("./order.router")
const productRouter = require("./product.router")
const authRouter = require("./auth.router")
const uploadRouter = require("./upload.router")

const {isLogin} = require("../Middleware/authorization")

mainRouter.use("/user", userRouter)
mainRouter.use("/promo", promoRouter)
mainRouter.use("/order", orderRouter)
mainRouter.use("/product", productRouter)
mainRouter.use("/auth", authRouter)
mainRouter.use("/upload", uploadRouter)

mainRouter.use((err, req, res, next) => {
    if (err instanceof multer.MulterError){
        res.status(400).json({
            msg: "Ukuran file terlalu besar"
        })
    }else{
        next()
    }
})

module.exports = mainRouter