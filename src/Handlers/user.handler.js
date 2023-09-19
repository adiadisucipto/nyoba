const {data, insert, update, del} = require("../Models/user.models")

const getData = async (req, res) => {
    try {
        const result = await data()
        res.status(200).json({
            msg: "Berhasil",
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error",
            error: error
        })
    }
}

const createData = async (req, res) => {
    try {
        const {full_name, email, phone, password} = req.body
        const result = await insert(full_name, email, phone, password)
        console.log(result)
        res.status(201).json({
            msg: `Pengguna dengan id ${result.rows[0].id_user} dan nama ${full_name} berhasil ditambahkan`,
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
        const {address} = req.body
        const {id_user} = req.params
        const result = await update(address, id_user)
        res.status(201).json({
            msg: `Pengguna dengan id ${id_user} beralamat di ${result.rows[0].address}`,
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(501).json({
            msg: "Error"
        })
    }
}

const deleteData = async (req, res) => {
    try {
        const {id_user} = req.params
        await del(id_user)
        res.status(200).json({
            msg: `Pengguna dengan id ${id_user} berhasil dihapus`
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
    deleteData
}