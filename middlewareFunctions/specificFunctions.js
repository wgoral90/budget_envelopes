const express = require("Express")
const app = express()

app.param("id", (req, res, next, id) => {
    const idToTest = req.params.id
    try {
        if (!/^[0-9]+$/.test(idToTest)) {
            throw "Wrong id parameter"
        }
    } catch (e) {
        res.status(400).send(e)
        next(e)
    } next()
})




function IdCheck(id) {
    const idToCheck = /^[0-9]+$/.test(id)
    if (!idToCheck)
        throw "Wrong id input"
}

function nameCheck(name) {
    if (name.length < 3 || name.length > 15) {
        throw "Wrong name input"
    }
}
function budgetCheck(budget) {
    const budgetToCheck = /^[0-9]+$/.test(budget)
    if (!budgetToCheck) {
        throw "Wrong budget input"
    }
}


function checkIdFormat(req, res, next) {
    const id = req.body.id
    try {
        IdCheck(id)
    } catch (e) {
        res.status(400).send(e)
        next(e)
    }
    next()
}

function checkNameFormat(req, res, next) {
    const name = req.body.name
    try {
        nameCheck(name)
    } catch (e) {
        res.status(400).send(e)
        next(e)
    }
    next()
}

function checkBudgetFormat(req, res, next) {
    const budget = req.body.budget
    try {
        budgetCheck(budget)
    } catch (e) {
        res.status(400).send(e)
        next(e)
    }
    next()
}

exports.checkIdFormat = checkIdFormat
exports.checkNameFormat = checkNameFormat
exports.checkBudgetFormat = checkBudgetFormat