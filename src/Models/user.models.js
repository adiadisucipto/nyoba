const db = require("../Configs/postgre")

const data = () => {
    const sql = "select * from coffeshop.user"
    return db.query(sql)
}

const insert = (full_name, email, phone, password) => {
    const value = [full_name, email, phone, password]
    const sql = `insert into coffeshop.user (full_name, email, phone, password) values ($1, $2, $3, $4)`
    return db.query(sql, value)
}

const update = (address, id_user) => {
    const value = [address, id_user]
    const sql = 'update coffeshop.user set address = $1 where id_user = $2 returning address'
    return db.query(sql, value)
}

const del = (id_user) => {
    const value = [id_user]
    const sql = 'delete from coffeshop.user where id_user = $1'
    return db.query(sql, value)
}

module.exports = {
    data,
    insert,
    update,
    del
}