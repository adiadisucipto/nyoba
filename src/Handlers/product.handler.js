const {data, create, update, del, sort, sortTime, count} = require("../Models/product.models")

const getData = async (req, res) => {
    try {
        const {page, perPage} = req.query
        const result = await data(page, perPage)

        if(!result.rows.length) return res.status(404).json({
            msg: "Halaman tidak ditemukan"
        })

        const metaResult = await count()

        const totalData = parseInt(metaResult.rows[0].total_data)
        const totalPage = Math.ceil(totalData / perPage)
        const isLastPage = parseInt(page) > totalPage

        const meta = {
            page: parseInt(page),
            totalPage,
            totalData,
            next: isLastPage ? null : `/product?page=${parseInt(page) + 1}&perPage=${perPage}`,
            prev: page == 1 ? null : `/product?page=${parseInt(page) - 1}&perPage=${perPage}`
        }

        res.status(200).json({
            msg: "Behasil",
            result: result.rows,
            meta
        })
    } catch (error) { 
        console.log(error)
        res.status(500).json({
            msg: "Error"
        })
    }
}

const createData = async (req, res) => {
    try {
        const {image, product_name, description, stock, category} = req.body
        await create(image, product_name, description, stock, category)
        res.status(201).json({
            msg: `${product_name} berhasil ditambahkan`
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

const updateData = async (req, res) => {
    try {
        const data = req.body
        const {id_product} = req.params
        await update(data, id_product)

        if(!id_product){
            throw new Error(`id ${id_product} tidak diberikan`)
        }

        res.status(201).json({
            msg: `Produk dengan id ${id_product} berhasil diubah`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error"
        })
    }
}

const deleteData = async (req, res) => {
    try {
        const {id_product} = req.params
        await del(id_product)

        if(!id_product){
            throw new Error(`id ${id_product} tidak diberikan`)
        }

        res.status(201).json({
            msg: `Produk dengan id ${id_product} berhasil dihapus`
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

const sortBy = async (req, res) => {
    try {
        const {sortBy, order} = req.query
        const result =  await sort(sortBy, order)
        res.status(201).json({
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error"
        })
    }
}

const sortByTime = async (req, res) => {
    try {
        const result = await sortTime()
        res.status(200).json({
            result: result.rows.sort((a, b) => {return a.created_at - b.created_at})
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

module.exports = {
    getData,
    createData,
    updateData,
    deleteData,
    sortBy,
    sortByTime
}