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

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})


const port = process.env.PORT || 4004

app.listen(port, () => console.log(`welcome to floor ${port}`))