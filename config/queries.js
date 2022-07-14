const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personal_budget',
  password: 'Marzec712',
  port: 5432
})

module.exports = pool