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

app.post('/api/student', (req, res)=> {
    let {name} = req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.log('student added successfully', {author: "Dax", type: 'manual'})
    
    res.status(200).send(students)
})

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, './index.html'))
    rollbar.info('html file served successfully.')
})

app.get('/css', (req, res)=> {
    res.sendFile(path.join(__dirname, './styles.css'))
})

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4004

app.listen(port, () => console.log(`welcome to floor ${port}`))