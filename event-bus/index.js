const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log(`Sending ${req.body.type} to all services in the eventbus`)

  //Sending events to Reviews
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(`Error in ${err.message} Reviews`);
  });
  ///Sending events to Movies
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(`Error in ${err.message} Movies`);
  });
  ///Sending events to Query
  axios.post("http://localhost:4007/events", event).catch((err) => {
    console.log(`Error in ${err.message} Query`);
  });
  ///Sending events to Moderation bus
  axios.post("http://localhost:4009/events", event).catch((err) => {
    console.log(`Error in ${err.message} Moderation`);
  });
  //console.log('ENDDDD')
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
