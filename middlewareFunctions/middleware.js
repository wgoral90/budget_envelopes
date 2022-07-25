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




module.exports = app