const pool = require("../config/queries")


const getEnvelopes = (req,res) => {
    pool.query('SELECT * FROM envelope.envelopes ORDER BY id DESC',(error,results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEnvelope = (req,res) =>{
    const {id, name, budget} = request.body
    pool.query('INSERT INTO envelope.envelopes(id, name, budget) VALUES ($1, $2, $3) RETURNING *', [id,name,budget], (error, results) => {
        if(error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

module.exports = {
    getEnvelopes,
    createEnvelope
}