const express = require("express")
const productRouter = express.Router()

const {getData, createData, updateData, deleteData, searchProduct, sortProductName, sortPriceProduct, sortByTime} = require("../Handlers/product.handler")

productRouter.get("/", getData)
productRouter.post("/", createData)
productRouter.patch("/:id_product", updateData)
productRouter.delete("/:id_product", deleteData)
productRouter.get("/search", searchProduct)
productRouter.get("/sort_product", sortProductName)
productRouter.get("/sort_price", sortPriceProduct)
productRouter.get("/sort_time", sortByTime)

module.exports = productRouter