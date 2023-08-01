const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())



app.post('/events', async (req, res) => {
    const {type, data} = req.body

    if(type === "ReviewCreated") { 
        console.log("Reeciveved  reviewCreated  in moderation and sending Review moderated to event bus in the moderation")
        const status = data.content.includes('bad') ? 'rejected' : 'approved'
        await axios.post('http://localhost:4005/events', {
            type: 'ReviewModerated', 
            data: {
                id: data.id,
                movieId: data.movieId,
                status,
                content: data.content
            }
        }).catch((err) => {
            console.log(`Error in ${err.message} Moderation Eventbus`);
          });

    }

})

app.listen(4009, () => {
    console.log('Listening to port 4009')
})