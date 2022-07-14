const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = 4000 

app.get('/',(req,res) =>{
    res.send('Hello World')
})

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})