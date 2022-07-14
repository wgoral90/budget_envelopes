const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = 4000 
const pool = require("./config/queries.js")

app.use(bodyParser.json())
app.use(morgan("dev"))

const envelopes = require("./routes/envelopes")

app.get('/envelopes', envelopes.getEnvelopes)
app.get('/envelopes', envelopes.createEnvelope)


app.get('/',(req,res) =>{
    res.send('Envelope API')
})



app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})