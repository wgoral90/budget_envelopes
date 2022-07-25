const pool = require("../config/queries")
const { moneyParser } = require("../utils/helperFunctions")


const getEnvelopes = (req, res) => {
    pool.query('SELECT * FROM envelope.envelopes ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createEnvelope = (req, res) => {
    const { id, name, budget } = req.body
    console.log(id)
    pool.query('INSERT INTO envelope.envelopes(id, name, budget) VALUES ($1, $2, $3) RETURNING *', [id, name, budget], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Envelope added with ID: ${results.rows[0].id}`)
    })
}

const transferBudget = async (req, res) => {
    const { startId, destId, budget } = req.body


    async function getInitialBudgets() {
        let results = await new Promise((resolve, reject) => pool.query(`SELECT budget FROM envelope.envelopes WHERE id = $1 OR id = $2`, [startId, destId], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        }))
        console.log(results)
        return results.rows

    }
    let initialBudgets = await getInitialBudgets()
    let startBudget = initialBudgets[0].budget
    let destBudget = initialBudgets[1].budget
    const intBudget = parseInt(budget)
    const intStartBudget = moneyParser(startBudget)
    const intDestBudget = moneyParser(destBudget)
    const finalStartBudget = (intStartBudget - intBudget).toString()
    const finalDestBudget = (intDestBudget + intBudget).toString()

    pool.query(`UPDATE envelope.envelopes SET budget = $1 WHERE id = $2`, [finalStartBudget, startId], (error, results) => {
        if (error) {
            throw error
        }
    })
    pool.query(`UPDATE envelope.envelopes SET budget = $1 WHERE id = $2`, [finalDestBudget, destId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Succesfully transfered ${budget} from Envelope ID ${startId} to Envelope ID ${destId}`)
    })
}

module.exports = {
    getEnvelopes,
    createEnvelope,
    transferBudget
}