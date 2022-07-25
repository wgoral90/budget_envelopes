const pool = require("../config/queries")
const { response } = require("../server")

const getOneEnvelope = (req, res) => {
    const envelopeId = req.params.envelopeId
    pool.query(`SELECT * FROM envelope.envelopes WHERE id  = $1`, [envelopeId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const deleteEnvelope = (req, res) => {
    const envelopeId = req.params.envelopeId
    pool.query(`DELETE FROM envelope.envelopes WHERE id = $1`, [envelopeId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Envelope with ID ${envelopeId} deleted.`)
    })
}

const updateEnvelope = (req, res) => {
    const envelopeId = req.params.envelopeId
    if (req.body.name && req.body.budget) {
        const { name, budget } = req.body
        pool.query(`UPDATE envelope.envelopes SET name = $1, budget = $2 WHERE id = $3`, [name, budget, envelopeId], (error, results) => {
            if (error) {
                throw (error)
            }
            res.status(200).send(`Envelope with ID ${envelopeId} modified.`)
        })

    } else if (req.body.name) {
        const name = req.body.name
        pool.query(`UPDATE envelope.envelopes SET name = $1 WHERE id = $2`, [name, envelopeId], (error, results) => {
            if (error) {
                throw (error)
            }
            res.status(200).send(`Envelope with ID ${envelopeId} modified.`)
        })
    } else if (req.body.budget) {
        const budget = req.body.budget
        pool.query(`UPDATE envelope.envelopes SET budget = $1 WHERE id = $2`, [budget, envelopeId], (error, results) => {
            if (error) {
                throw (error)
            }
            res.status(200).send(`Envelope with ID ${envelopeId} modified.`)
        })
    }
}

module.exports = {
    getOneEnvelope,
    deleteEnvelope,
    updateEnvelope
}