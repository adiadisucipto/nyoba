const express = require("express")
const orderRouter = express.Router()

const {getData, createData, updateData, delData} = require('../Handlers/order.handler')

orderRouter.get("/", getData)
orderRouter.post("/:id_user", createData)
orderRouter.patch("/:id_order", updateData)
orderRouter.delete("/:id_order", delData)

module.exports = orderRouter