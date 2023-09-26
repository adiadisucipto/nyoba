const express = require("express")
const productRouter = express.Router()

const {getData, createData, updateData, deleteData, searchProduct, sortBy, sortByTime} = require("../Handlers/product.handler")
const {upload} = require("../Middleware/diskUpload")

productRouter.get("/", getData)
productRouter.post("/", upload, createData)
productRouter.patch("/:id_product", updateData)
productRouter.delete("/:id_product", deleteData)
productRouter.get("/sort_price", sortBy)
productRouter.get("/sort_time", sortByTime)



module.exports = productRouter