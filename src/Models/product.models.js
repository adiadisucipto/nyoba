const db = require("../Configs/postgre")

const data = async (page = 1, perPage = 5) => {
    const offset = (page - 1) * perPage
    const sql = `select * from coffeshop.product order by id_product asc limit $1 offset $2`
    const value = [perPage, offset]
    const count = await db.query(`select count(id_product) from coffeshop.product`)
    const totalData = count.rows[0].count
    const result = await db.query(sql, value)
    const meta = {
        next: result.rowCount == 0 ? null: totalData == 0 ? null : page == Math.ceil(totalData/perPage) ? null : Number(page) + 1,
        prev: result.rowCount == 0 ? null : page == 1 ? null : (page - 1),
        total: totalData
    }
    return {result: result.rows, meta}
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

const sort = (sortBy, order) => {
    let sortOrder = order === 'desc' ? 'desc' : 'asc'
    let sort = sortBy === 'price' ? 'price' : 'product_name'
    const sql = `select product_name, price
    from coffeshop.product p join coffeshop.product_size ps on p.id_product = ps.id_product order by ${sort} ${sortOrder}`
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
    sort,
    sortTime
}