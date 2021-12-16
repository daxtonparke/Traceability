const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '3079bdf26d644a3faea00027df685975',
  captureUncaught: true,
  captureUnhandledRejections: true
});

let students = []

// app.get('/', (req, res)=> {
//     newfunction()
// }).catch(err => console.log(err))


app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

// app.get('/css', (req, res)=> {
//     res.sendFile(path.join(__dirname, '/public/styles.css'))
// })

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4004

app.listen(port, () => console.log(`welcome to floor ${port}`))