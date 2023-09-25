const db = require("../Configs/postgre")

const data = async (page = 1, perPage = 5) => {
    const offset = (page - 1) * perPage
    const value = [perPage, offset]
    const sql = "select product_name, stock, category from coffeshop.product limit $1 offset $2"
    return db.query(sql, value)
}

const count = () => {
    let sql = `select count(id_product) as "total_data" from coffeshop.product`
    return db.query(sql)
}

const create = (image, product_name, description, stock, category) => {
    const value = [image, product_name, description, stock, category]
    const sql = "insert into coffeshop.product (image, product_name, description, stock, category) values ($1, $2, $3, $4, $5)"
    return db.query(sql, value)
}

const update = (data, id_product) => {
    let values = []
    let updates = []
    const datas = Object.keys(data).length
    for(let j = 0; j < datas; j++){
        values.push(Object.values(data)[j])
        const key = Object.keys(data)[j]
        updates.push(`${key} = $${j + 1}`)
    }
    console.log(updates.join(", "))
    const sql = `update coffeshop.product set ${updates.join(", ")} where id_product = ${id_product}`
    return db.query(sql, values)
}

const del = (id_product) => {
    const value = [id_product]
    const sql = "delete from coffeshop.product where id_product = $1"
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
    sort,
    sortTime,
    count
}