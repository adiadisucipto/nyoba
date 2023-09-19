const {data, create, update, del} = require('../Models/promo.models')

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
        const {promo_name, start_date, end_date} = req.body
        const result = await create(promo_name, start_date, end_date)
        res.status(201).json({
            msg: "Berhasil"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

const updateData = async (req, res) => {
    try {
        const {discount} = req.body
        const {id_promo} = req.params
        await update(discount, id_promo)
        res.status(201).json({
            msg: "Berhasil"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

const delData = async (req, res) => {
    try {
        const {id_promo} = req.params
        await del(id_promo)
        res.status(200).json({
            msg: "Berhasil"
        })
    } catch (error) {
        msg: "Error"
    }
}

module.exports = {
    getData,
    createData,
    updateData,
    delData
}