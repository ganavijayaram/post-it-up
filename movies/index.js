const express =  require("express")
// To generate random number for post id
const crypto  = require('crypto')
// To parse the data sent by the user
const bodyParser = require('body-parser')
const app =  express()
// It is used to parse incoming HTTP request bodies that are in JSON format.
app.use(bodyParser.json())

const movies = {}

// /movies is the route
// the other parameter is the router handler when /movies is requested
app.get('/movies', (req, res) => {

    // sending all the movies
    res.send(movies)
    
})

app.post('/movies', (req, res) => {
    //Generate 4 bytes of random number and convert it into hex string
    const id = crypto.randomBytes(4).toString('hex')
    // Destructuring assignment is a feature introduced in ECMAScript 2015 (ES6) 
    // that allows you to extract properties from objects and assign them to 
    // variables with the same name as the property.
    const {title} = req.body
    
    movies[id] = {
        id, 
        title
    }
    
    // sending the post which was successfully created
    res.status(201).send(movies[id])

})

// sets up the server to listen on port 4000 for incoming HTTP requests.
app.listen(4000, () => {
    console.log('Listening on port 4000')
})