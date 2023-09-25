module.exports = {
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    dbDatabase: process.env.DB_DATABASE,
    dbPassword: process.env.DB_PASSWORD,
    jwtKey: process.env.JWT_KEY,
    issuer: process.env.JWT_ISSUER
}