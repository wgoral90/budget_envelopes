const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = 4000
const pool = require("./config/queries.js")
const middleware = require("./middlewareFunctions/middleware.js")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"))

const envelopes = require("./routes/envelopes")
const envelopesID = require("./routes/envelopesID")
const { checkIdFormat, checkNameFormat, checkBudgetFormat } = require("./middlewareFunctions/specificFunctions.js")

app.use(middleware)
app.get('/envelopes', envelopes.getEnvelopes)
app.get('/envelopes/:envelopeId', envelopesID.getOneEnvelope)
app.post('/envelopes', checkIdFormat, checkNameFormat, checkBudgetFormat, envelopes.createEnvelope)
app.delete('/envelopes/:envelopeId', envelopesID.deleteEnvelope)
app.put('/envelopes/:envelopeId', envelopesID.updateEnvelope)
app.put('/envelopes', envelopes.transferBudget)

app.get('/', (req, res) => {
    res.send('Envelope API')
})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app