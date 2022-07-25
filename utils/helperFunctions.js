const pool = require("../config/queries")

function moneyParser(moneyStr) {
    let resultStr = ""
    for (let i = 0; i < moneyStr.length; i++) {
        if (moneyStr[i] === ",") {
            break
        }
        else if (/^[0-9]+$/.test(moneyStr[i])) {
            resultStr += moneyStr[i]
        }

    } return parseInt(resultStr)
}

async function getInitialBudgets(idOne, idTwo) {

    let budgets = await pool.query(`SELECT budget FROM envelope.envelopes WHERE id = $1 OR id = $2`, [idOne, idTwo], (error, results) => {
        if (error) {
            throw error
        } else {

            console.log(budgets)
            return budgets
        }
    })
}
function getValuesFromDB(idOne, idTwo) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT budget FROM envelope.envelopes WHERE id = $1 OR id = $2`, [idOne, idTwo], (error, results) => {
            if (error)
                reject(error);
            else
                resolve(results);
        });
    });
}


exports.moneyParser = moneyParser
exports.getInitialBudgets = getInitialBudgets
exports.getValuesFromDB = getValuesFromDB