const db = require("../Configs/postgre")

const data = () => {
    const sql = "select * from coffeshop.product"
    return db.query(sql)
}

const create = (image, product_name, description, stock, category) => {
    const value = [image, product_name, description, stock, category]
    const sql = "insert into coffeshop.product (image, product_name, description, stock, category) values ($1, $2, $3, $4, $5)"
    return db.query(sql, value)
}

const update = (stock, id_product) => {
    const value = [stock, id_product]
    const sql = "update coffeshop.product set stock = $1 where id_product = $2"
    return db.query(sql, value)
}

const del = (id_product) => {
    const value = [id_product]
    const sql = "delete from coffeshop.product where id_product = $1"
    return db.query(sql, value)
}

const search = (product_name) => {
    const value = [`%${product_name}%`]
    const sql = 'select product_name from coffeshop.product where product_name ilike $1'
    return db.query(sql, value)
}

const sortName = () => {
    const sql = "select product_name, price from coffeshop.product p join coffeshop.product_size ps on p.id_product = ps.id_product order by product_name asc"
    return db.query(sql)
}

const sortPrice = () => {
    const sql = "select product_name, price from coffeshop.product p join coffeshop.product_size ps on p.id_product = ps.id_product"
    return db.query(sql)
}

const sortTime = () => {
    const sql = "select * from coffeshop.product"
    return db.query(sql)
}

module.exports = {
    data,
    create,
    update,
    del,
    search,
    sortName,
    sortPrice,
    sortTime
}