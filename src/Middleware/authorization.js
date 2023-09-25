const jwt = require("jsonwebtoken")
const { jwtKey, issuer } = require("../Configs/environment")
const db = require("../Configs/postgre")

const {role} = require("../Models/authorization.models")

const isLogin = (req, res, next) => {
    const bearerToken = req.header("Authorization")
    const token = bearerToken.split(" ")[1]
    jwt.verify(token, jwtKey, issuer, (err, data) => {
        if(err){
            switch (err.name){
                case 'TokenExpiredError':
                    return res.status(401).json({
                        msg: "Akses berakhir, silahkan login ulang"
                })
                case 'JsonWebTokenError':
                    return res.status(401).json({
                        msg: "Token tidak valid"
                    })
                case 'NotBeforeError':
                    return res.status(401).json({
                        msg: "Token belum aktif, tolong tunggu"
                    })
            }

        }
        req.userInfo = data
        next()
    })
}

const userRole = (req, res, next) => {
    const bearerToken = req.header("Authorization")
    const token = bearerToken.split(" ")[1]
    jwt.verify(token, jwtKey, issuer, (err, decode) => {
        const role = decode.user_role
        if(role === 'admin') return next()
        res.status(400).json({msg: "Hanya admin yang dapat mengakses"})
    })
}

module.exports = {
    isLogin,
    userRole
}