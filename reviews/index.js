const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const axios = require('axios')


app = express()
app.use(bodyParser.json())
app.use(cors())


const reviewsByMovieId = {}

app.get('/movies/:id/reviews', (req, res) => {
    const movieId = req.params.id
    res.send(reviewsByMovieId[movieId] || [])

})

app.post('/movies/:id/reviews', async (req, res) => {

    const reviewId = crypto.randomBytes(4).toString('hex')
    // in the req.body if there is field called content, that value is assigned to the content variable
    const {content} = req.body
    //console.log(`CONTENT ${content}`)
    const movieId = req.params.id
    // reviewsByMovieId[req.params.id] if unedfined then []
    const reviews = reviewsByMovieId[movieId] || []
    reviews.push({id: reviewId, content})
    reviewsByMovieId[movieId] = reviews
    //send it to event bus

    await axios.post('http://localhost:4005/events', {
        type: 'ReviewCreated',
        data: {
            id: reviewId,
            content,
            movieId
        }
    })
    res.status(201).send(reviewsByMovieId)

})

 //Handling the events received from the event bus
 app.post('/events', (req, res) => {
    console.log(`Event received from the event bus Type: ${req.body.type}`)
    res.send({})
})

app.listen(4001, () => {
    console.log("Listening to Port 4001")
})