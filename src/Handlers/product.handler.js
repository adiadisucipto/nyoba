const {data, create, update, del, search, sortName, sortPrice, sortTime} = require("../Models/product.models")

const getData = async (req, res) => {
    try {
        const {page, perPage} = req.query

        const a = page || 1
        const b = perPage || 5

        const startIndex = (a - 1) * b
        const endIndex = startIndex + b

        const result = await data()

        res.status(200).json({
            result: result.rows.slice(startIndex, endIndex),
            currentPage : a,
            totalPage: Math.ceil(result.rows.length / b)
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
        const {stock} = req.body
        const {id_product} = req.params
        await update(stock, id_product)

        if(!id_product){
            throw new Error(`id ${id_product} tidak ditemukan`)
        }

        res.status(201).json({
            msg: `Stock produk dengan id ${id_product} berhasil diubah`
        })
    } catch (error) {
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
            throw new Error(`id ${id_product} tidak ditemukan`)
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

const searchProduct = async (req, res) => {
    try {
        const {product_name} = req.query
        const result = await search(product_name)

        res.status(200).json({
            msg: "Berhasil",
            result: result.rows
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

const sortProductName = async (req, res) => {
    try {
        const {page, perPage} = req.query

        const a = page || 1
        const b = perPage || 5

        const startIndex = (a - 1) * b
        const endIndex = startIndex + b

        const result = await sortName()
        res.status(201).json({
            result: result.rows.slice(startIndex, endIndex),
            currentPage: a,
            totalPage: Math.ceil(result.rows.length / b)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error"
        })
    }
}

const sortPriceProduct = async (req, res) => {
    try {
        const result = await sortPrice()
        res.status(200).json({
            result: result.rows.sort((a, b) => {return a.price - b.price})
        })
    } catch (error) {
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
    searchProduct,
    sortProductName,
    sortPriceProduct,
    sortByTime
}