const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

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
app.get('/posts', (req, res) => {
    res.send(movies)
})

//Handling the events received from the event bus


  app.post("/events", (req, res) => {
    //if the body has type and data, those corresponding values are stored on LHS
    console.log("QUERY")
    const {type, data} = req.body

    if(type == "MovieCreated") {

        //check this
        const {id, title} = data

        movies[id] = {id, title, reviews: []}

    }

    if(type == "ReviewCreated") {

        const {id, content, movieId} = data

        const movie = movies[movieId]
        movie.reviews.push({id, content})

    }
    console.log(movies)
    res.send({})
})

app.listen(4007, () => {
    console.log('Listening on port 4007')
})