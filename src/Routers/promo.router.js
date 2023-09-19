const express = require("express")
const promoRouter = express.Router()

const {getData, createData, updateData, delData} = require('../Handlers/promo.handler')

promoRouter.get("/", getData)
promoRouter.post("/", createData)
promoRouter.patch("/:id_promo", updateData)
promoRouter.delete("/:id_promo", delData)

module.exports = promoRouter