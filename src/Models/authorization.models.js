const db = require("../Configs/postgre")

const role = (id_user) => {
    const value = [id_user]
    const sql = "select user_role from coffeshop.user where id_user = $1"
    return db.query(sql, value)
}

module.exports = {
    role
}