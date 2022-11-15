const express = require('express');
const {getLeaderboard} = require('../database/postgresdb.js');
const {retrieveCategories} = require('./controller.js');

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/shutterstock_image_categories', (req, res)=> {
  retrieveCategories()
  .then((val)=>{
    res.send(val.data.data);
  })
  .catch((err)=>{res.status(500).send()})
});

app.get('/shutterstock_image', (req, res)=> {

  res.send();
});

app.get('/leaderboard', (req, res)=> {
  getLeaderboard()
  .then((results)=> {
    res.send(results.rows);
  })
  .catch((err)=> {
    res.status(500).send();
  })

});

const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});