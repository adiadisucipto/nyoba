const pg = require("pg")
const {Pool} = pg

const {dbUser, dbHost, dbDatabase, dbPassword} = require("./environment")

const db = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbDatabase,
    password: dbPassword
})

module.exports = db