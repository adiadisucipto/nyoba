const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const a = cb(null, './Public/image')
    },
    filename: (req, file, cb) => {
        const nameFile = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.originalname}`
        cb(null, nameFile)
    }
})


const diskUp = multer({
    storage,
    limits: {
        fileSize: 1
    },
    fileFilter: (req, file, cb) => {
        if(path.extname(file.originalname) !== '.jpg'){
            return cb("File harus .jpg", false)
        }
        cb(null, true)
    }
})

const upload = diskUp.single('image')

module.exports = {
    upload
}