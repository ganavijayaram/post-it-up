const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())
 /* Datastructre for storing posts and comments info
movies === {
    id: {
        id: id,
        title,
        reviews = [ 
            {
                id, content
            }
            {
                id, content
            }
        ]
    },
    id: {
        id: id,
        title,
        reviews = [ 
            {
                id, content
            }
            {
                id, content
            }
        ]
    }

}
*/

movies = {}

const handleEvent = (type, data) => {
    if(type == "MovieCreated") {
        console.log("Reeciveved  MovieCreated in query")
        //check this
        const {id, title} = data

        movies[id] = {id, title, reviews: []}

    }

    if(type == "ReviewCreated") {
        console.log("Reeciveved  reviewCreated in query")

        const {id, content, movieId, status} = data

        const movie = movies[movieId]
        movie.reviews.push({id, content, status})

    }

    if(type == "ReviewUpdated") {

        console.log("Reeciveved  reviewupdated in query")

        const {id, content, movieId, status} = data

        const movie = movies[movieId]
        const review = movie.reviews.find(review => {
            return review.id === id
        })
        review.status = status
        review.content = content
        //you dont have to poush it back to the movie, because we are updating movie in place

    }
}

app.get('/movies', (req, res) => {
    console.log(`QUERY GET ${req.body} ${movies}`)
    res.send(movies)
})

//Handling the events received from the event bus


  app.post("/events", (req, res) => {
    //if the body has type and data, those corresponding values are stored on LHS
    console.log("QUERY")
    const {type, data} = req.body

    handleEvent(type, data)

    console.log(movies)
    res.send({})
})

app.listen(4007, async () => {
    console.log('Listening on port 4007')

    try {
        const res = await axios.get("http://event-bus-srv:4005/events").catch((err) => {
            console.log(`Error in ${err.message} Query`);
          });;
     
        for (let event of res.data) {
          console.log("Processing event:", event.type);
     
          handleEvent(event.type, event.data);
        }
      } catch (error) {
        console.log(error.message);
      }
})