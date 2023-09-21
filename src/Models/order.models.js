const db = require("../Configs/postgre")

const data = () => {
    const sql = "select * from coffeshop.order"
    return db.query(sql)
}

const create = (id_user, no_order, date_order, stat, total) => {
    const value = [id_user, no_order, date_order, stat, total]
    const sql = 'insert into coffeshop.order (id_user ,no_order, date_order, status, total) values ($1, $2, $3, $4, $5)'
    return db.query(sql, value)
}

const update = (status, id_order) => {
    const value = [status, id_order]
    const sql = "update coffeshop.order set status = $1 where id_order = $2"
    return db.query(sql, value)
}

const del = (id_order) => {
    const sql = "delete from coffeshop.order where id_order = $1"
    return db.query(sql, id_order)
}

module.exports = {
    data,
    create,
    update,
    del
}