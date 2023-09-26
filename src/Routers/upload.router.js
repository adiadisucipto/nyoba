const express = require("express")
const uploadRouter = express.Router()

const {update, uploads} = require("../Handlers/upload.handler")
const {upload} = require("../Middleware/diskUpload")

uploadRouter.patch("/upload/:id_product", upload, update)

uploadRouter.post("/upload/:id_product", upload, uploads)

module.exports = uploadRouter