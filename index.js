const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const port = 5000

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventsCollection = client.db("volunteerNetwork").collection("events");

  app.post('/addEvent', (req, res) => {
      const newEvent = req.body;
      eventsCollection.insertOne(newEvent)
      .then(result => console.log(result))
  })

  app.get('/events', (req, res) => {
      eventsCollection.find()
      .toArray((err, documents) => {
          res.send(documents)
      })
  })

});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)