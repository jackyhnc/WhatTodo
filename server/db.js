require("dotenv").config()
const Pool = require("pg").Pool

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todoapp'
})

module.exports = pool