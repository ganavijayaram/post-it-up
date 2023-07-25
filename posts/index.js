const express =  require("express")
// To generate random number for post id
const randomBytes  = require('crypto')
// To parse the data sent by the user
const bodyParser = require('body-parser')
const app =  express()
// It is used to parse incoming HTTP request bodies that are in JSON format.
app.use(bodyParser.json())

const posts =[]

// /posts is the route
// the other parameter is the router handler when /posts is requested

app.get('/posts', (req, res) => {
    console.log(`GET req = ${req.body} res = ${res}`)
    console.log(req.body)
    // sending all the posts
    res.send(posts)
})

app.post('/posts', (req, res) => {
    console.log(`GET reqBody = ${req.body} res = ${res}`)
    //Generate 4 bytes of random number and convert it into hex string
    const id =  randomBytes(4).toString('hex')
    // Destructuring assignment is a feature introduced in ECMAScript 2015 (ES6) 
    // that allows you to extract properties from objects and assign them to 
    // variables with the same name as the property.
    const {title} = req.body
    posts[id] = {
        id, title
    }

    // sending the post which was successfully created
    res.status(201).send(posts[id])

})

// sets up the server to listen on port 4000 for incoming HTTP requests.
app.listen(4000, () => {
    console.log('Listening on post 4000')
})