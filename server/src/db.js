const Pool = require('pg').Pool

const pool = new Pool({
	user: "postgres",
	password: "584049",
	host: "82.146.40.11",
	port: 5432,
	database: "freewriting"
})

module.exports = pool