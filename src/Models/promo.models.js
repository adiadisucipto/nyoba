const db = require("../Configs/postgre")

const data = () => {
    const sql = "select * from coffeshop.promo"
    return db.query(sql)
}

const create = (promo_name, start_date, end_date) => {
    const value = [promo_name, start_date, end_date]
    const sql = "insert into coffeshop.promo (promo_name, start_date, end_date) values ($1, $2, $3)"
    return db.query(sql, value)
}

const update = (discount, id_promo) => {
    const value = [discount, id_promo]
    const sql = "update coffeshop.promo set discount = $1 where id_promo = $2"
    return db.query(sql, value)
}

const del = (id_promo) => {    
    const value = [id_promo]
    const sql = "delete from coffeshop.promo where id_promo = $1"
    return db.query(sql, value)
}

module.exports = {
    data,
    create,
    update,
    del
}