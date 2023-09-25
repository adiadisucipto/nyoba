const db = require("../Configs/postgre")
const escape = require("pg-format")

const data = async (page = 1, perPage = 5) => {
    const offset = (page - 1) * perPage
    const value = [perPage, offset]
    const sql = "select product_name, stock, category from coffeshop.product limit $1 offset $2"
    return db.query(sql, value)
    // let query = ""
    // if (product_name != ""){
    //     product_name = `%${product_name}%`
    //     query = escape(`where product_name ilike %L`, product_name)
    // }
    // const offset = (page - 1) * perPage
    // const sql = `select * from coffeshop.product ${query} order by id_product asc limit $1 offset $2`
    // const value = [perPage, offset]
    // const count = await db.query(`select count(id_product) from coffeshop.product ${query}`)
    // const totalData = count.rows[0].count
    // const result = await db.query(sql, value)
    // const meta = {
    //     next: result.rowCount == 0 ? null: totalData == 0 ? null : page == Math.ceil(totalData/perPage) ? null : Number(page) + 1,
    //     prev: result.rowCount == 0 ? null : page == 1 ? null : (page - 1),
    //     total: totalData
    // }
    // return {result: result.rows, meta}
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
    let i = 0
    let updates = []
    Object.keys(data).forEach((key)=>{
        console.log(key, ":", data[key])
        if(data[key] !== undefined && data[key] !=''){
            updates.push(`${key} = $${i+1}`)
            values.push(data[key])
            i++
        }
      })
    values.push(id_product)
    console.log(i)
    console.log(values)
    console.log(updates)
    console.log(data)
    const sql = `update coffeshop.product set ${updates.join(", ")} where id_product = $${i+1}`
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