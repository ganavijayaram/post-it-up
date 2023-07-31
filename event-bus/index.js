const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json)

//whenever we receive the events we will send them to 
app.post('/events', (req, res) => {
    const event = req.body
    console.log(`hello i ma here`)
    axios.post('http://localhost:4002/events', event) //movies
    axios.post('http://localhost:4001/events', event) //reviews
    axios.post('http://localhost:4003/events', event) //query

    res.send({status: 'OK'})

})

app.listen(4005, () => {
    console.log('Listening to Port 4005')
} )