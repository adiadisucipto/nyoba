const {data, insert, update, del, count} = require("../Models/user.models")

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
            msg: "Berhasil",
            result: result.rows,
            meta
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
        if(error.constraint.includes("email")){return res.json({msg: "Email sudah didaftarkan"})}
        if(error.constraint.includes("phone")){return res.json({msg: "No. HP sudah didaftarkan"})}
        res.status(500).json({
            msg: "Error"
        })
    }
}

const updateData = async (req, res) => {
    try {
        const datas = req.body
        const {id_user} = req.params
        const result = await update(datas, id_user)
        const Result = await data()
        for(let i = 0; i < (Result.rows).length; i++){
            if(Result.rows[i].id_user == id_user){
                return res.status(201).json({
                    msg: `Data pengguna dengan id ${id_user} berhasil diubah`,
                })
            }
        }
        res.status(400).json({
            msg: "ID user tidak ditemukan"
        })
    } catch (error) {
        res.status(501).json({
            msg: "Error"
        })
    }
}

const deleteData = async (req, res) => {
    try {
        const {id_user} = req.params
        await del(id_user)
        const Result = await data()
        for(let i = 0; i < (Result.rows).length; i++){
            if(Result.rows[i].id_user == id_user){
                return res.status(200).json({
                    msg: `Pengguna dengan id ${id_user} berhasil dihapus`
                })
            }
        }
        res.status(400).json({
            msg: "ID user tidak ditemukan"
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