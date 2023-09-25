const db = require("../Configs/postgre")

const create = (full_name, email, phone, userpass) => {
    const value = [full_name, email, phone, userpass]
    const sql = "insert into coffeshop.user (full_name, email, phone, userpass) values ($1, $2, $3, $4)"
    return db.query(sql, value)
}

const login = (email) => {
    const value = [email]
    const sql = "select full_name, email, user_role, userpass from coffeshop.user where email = $1"
    return db.query(sql, value)
}

module.exports = {
    create,
    login
}