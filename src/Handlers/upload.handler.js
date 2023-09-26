const {up, upp} = require("../Models/upload.models")

const update = async (req, res) => {
    try {
        const {path} = req.file
        const {id_product} = req.params
        await up(path, id_product)
        console.log(req.file)
        res.status(200).json({
            msg: "FIle berhasil diunggah"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const uploads = async (req, res) => {
    const {path} = req.file
    await upp(path)
    console.log(req.file)
    res.status(500).json({
        msg: "FIle berhasil diunggah"
    })
}

module.exports = {
    update,
    uploads
}