const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event)

  console.log(`Sending ${req.body.type} to all services in the eventbus`)

  //Sending events to Reviews
  axios.post("http://reviews-srv:4001/events", event).catch((err) => {
    console.log(`Error in ${err.message} Reviews - Eventbus`);
  });
  ///Sending events to Movies
  axios.post("http://movies-clusterip-srv:4002/events", event).catch((err) => {
    console.log(`Error in ${err.message} ${event.body} Movies- Eventbus`);
  });
  ///Sending events to Query
  axios.post("http://query-srv:4007/events", event).catch((err) => {
    console.log(`Error in ${err.message} Query- Eventbus`);
  });
  ///Sending events to Moderation bus
  axios.post("http://moderation-srv:4009/events", event).catch((err) => {
    console.log(`Error in ${err.message} Moderation- Eventbus`);
  });
  //console.log('ENDDDD')
  res.send({ status: "OK" });
});

//
app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
  console.log("Listening on 4005");
});
