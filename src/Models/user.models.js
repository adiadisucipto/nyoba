const db = require("../Configs/postgre")

const data = (page = 1, perPage = 5) => {
    const offset = (page - 1) * perPage
    const value = [perPage, offset]
    const sql = "select * from coffeshop.user limit $1 offset $2"
    return db.query(sql, value)
}

const insert = (full_name, email, phone, password) => {
    const value = [full_name, email, phone, password]
    const sql = `insert into coffeshop.user (full_name, email, phone, password) values ($1, $2, $3, $4) returning id_user`
    return db.query(sql, value)
}

const update = (datas, id_user) => {
    const values = []
    const updates = []
    const totalData = Object.keys(datas).length
    for(let i = 0; i < totalData; i++){
        values.push(Object.values(datas)[i])
        updates.push(`${Object.keys(datas)[i]} = $${i + 1}`)
    }
    values.push(id_user)
    const sql = `update coffeshop.user set ${updates.join(", ")} where id_user = $${values.length}`
    return db.query(sql, values)
}

const del = (id_user) => {
    const value = [id_user]
    const sql = 'delete from coffeshop.user where id_user = $1'
    return db.query(sql, value)
}

const count = () => {
    let sql = `select count(id_user) as "total_data" from coffeshop.user`
    return db.query(sql)
}

module.exports = {
    data,
    insert,
    update,
    del,
    count
}