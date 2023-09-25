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

const update = (datas, id_promo) => {
    const values = []
    const updates = []
    const totalData = Object.keys(datas).length
    for(let i = 0; i < totalData; i++){
        values.push(Object.values(datas)[i])
        updates.push(`${Object.keys(datas)[i]} = $${i + 1}`)
    }
    values.push(id_promo)
    const sql = `update coffeshop.promo set ${updates.join(", ")} where id_promo = $${values.length}`
    return db.query(sql, values)
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