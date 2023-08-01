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
    reviews.push({id: reviewId, content, status:"pending"})
    reviewsByMovieId[movieId] = reviews
    //send it to event bus
    console.log("Sending reviewCreated to event bus in the Review")
    await axios.post('http://localhost:4005/events', {
        type: 'ReviewCreated',
        data: {
            id: reviewId,
            content,
            movieId,
            status: 'pending'
        }
    }).catch((err) => {
        console.log(`Error in ${err.message} Review`);
      });
    res.status(201).send(reviewsByMovieId)

})

 //Handling the events received from the event bus
 app.post('/events', async (req, res) => {
    console.log(`Review: Event received from the event bus Type: ${req.body.type}`)
    const {type, data} = req.body
    if(type === 'ReviewModerated') {
        console.log("Reeciveved  reviewModerted in query   and sending Review updatedted to event bus in the query")
        const {movieId, id, status, content} = data
        const reviews = reviewsByMovieId[movieId]
        const review = reviews.find(review => {
            return review.id === id
        })
        review.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'ReviewUpdated',
            data: {
                id,
                content,
                movieId,
                status
            }
        }).catch((err) => {
            console.log(`Error in ${err.message} Review`);
          });
    }

    res.send({})
})

app.listen(4001, () => {
    console.log("Listening to Port 4001")
})