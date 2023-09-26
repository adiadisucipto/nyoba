require("dotenv").config()

const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static("./public"))

app.listen(8000, () => {
    console.log("Berhasil")
})

const mainRouter = require("./src/Routers/main.router")
app.use(mainRouter);