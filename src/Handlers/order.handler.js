const {data, create, update, del} = require("../Models/order.models")

const getData = async (req, res) => {
    try {
        const result = await data()
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

const createData = async (req, res) => {
    try {
        const {no_order, date_order, status, total} = req.body
        const {id_user} = req.params
        const result = await create(id_user, no_order, date_order, status, total)
        res.status(201).json({
            msg: "Berhasil",
            result: result.rows[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error"
        })
    }
}

const updateData = async (req, res) => {
    try {
        const {status} = req.body
        const {id_order} = req.params
        await update(status, id_order)
        res.status(201).json({
            msg: "Berhasil"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error"
        })
    }
}

const delData = async (req, res) => {
    try {
        const {id_order} = req.params
        await del(id_order)
        res.status(201).json({
            msg: "Berhasil"
        })
    } catch (error) {
        res.status()        
    }
}

module.exports = {
    getData,
    createData,
    updateData,
    delData
}