const express = require("express")
const userRouter = express.Router()

userRouter.get("/user", async (req, res) => {
    try {
        const sql = "select * from coffeshop.user"
        const result = await db.query(sql)
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
})

module.exports = userRouter