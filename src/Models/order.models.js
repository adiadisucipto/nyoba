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

const update = (datas, id_order) => {
    const values = []
    const updates = []
    const totalData = Object.keys(datas).length
    for(let i = 0; i < totalData; i++){
        values.push(Object.values(datas)[i])
        updates.push(`${Object.keys(datas)[i]} = $${i + 1}`)
    }
    values.push(id_order)
    const sql = `update coffeshop.order set ${updates.join(", ")} where id_user = $${values.length}`
    return db.query(sql, values)
}

const del = (id_order) => {
    const value = [id_order]
    const sql = "delete from coffeshop.order where id_order = $1"
    return db.query(sql, value)
}

module.exports = {
    data,
    create,
    update,
    del
}