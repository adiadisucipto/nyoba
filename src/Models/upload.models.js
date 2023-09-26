const db = require("../Configs/postgre")

const up = (path, id_product) => {
    const value = [path, id_product]
    const sql = `update coffeshop.product set image = $1 where id_product = $2`
    return db.query(sql, value)
}

const upp = (path) => {
    const value = [path]
    const sql = `insert into coffeshop.product (image) values ($1)`
    return db.query(sql, value)
}

module.exports ={
    up,
    upp
}