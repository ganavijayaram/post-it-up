const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')



app = express()
app.use(bodyParser.json())


const reviewsByMovieId = {}

app.get('/movies/:id/reviews', (req, res) => {
    const movieId = req.params.id
    res.send(reviewsByMovieId[movieId] || [])

})

app.post('/movies/:id/reviews', (req, res) => {

    const reviewId = crypto.randomBytes(4).toString('hex')
    // in the req.body if there is field called content, that value is assigned to the content variable
    const {content} = req.body
    const movieId = req.params.id
    // reviewsByMovieId[req.params.id] if unedfined then []
    const reviews = reviewsByMovieId[movieId] || []
    reviews.push({id: reviewId, content})
    reviewsByMovieId[movieId] = reviews
    res.status(201).send(reviewsByMovieId)

})

app.listen(4001, () => {
    console.log("Listening to Port 4001")
})