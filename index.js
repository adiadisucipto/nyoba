const express = require("express")
const app = express()

const pg = require("pg")
const {Pool} = pg

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "coffeeshop",
    password: "1234"
})

const mainRouter = require("./src/Routers/main.router")
app.use(mainRouter);

app.listen(8000, () => {
    console.log("Berhasil")
})