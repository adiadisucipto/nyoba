const argon = require("argon2")
const jwt = require("jsonwebtoken")
const {jwtKey} = require("../Configs/environment")
const {create, login} = require("../Models/auth.models")
const {data} = require("../Models/user.models")

const createUser = async (req, res) => {
    try {
        const {full_name, email, phone, password, user_role} = req.body
        const userpass = await argon.hash(password)
        await create(full_name, email, phone, userpass, user_role)
        res.status(201).json({
            msg: "User berhasil ditambahkan",
            data: {
                full_name,
                email,
                phone,
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const result = await login(email)
        if (!result.rows.length)
            return res.status(404).json({
                mgs: "Email atau password salah"
            });
        const {full_name, userpass, user_role} = result.rows[0]
        const isValid = await argon.verify(userpass, password)
        if(!isValid) return res.status(500).json({
            msg: "Password salah"
        })
        const payload = {
            full_name,
            email,
            user_role
        }
        jwt.sign(payload, jwtKey, {expiresIn: "10m"}, (error, token) => {
            if(error) throw error
            res.status(200).json({
                msg: `Selamat datang ${full_name}`,
                data: {
                    token,
                    userInfo: {
                        email
                    }
                }
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports = {
    createUser,
    loginUser
}