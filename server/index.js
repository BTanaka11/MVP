const express = require('express');
const {getLeaderboard} = require('../database/postgresdb.js');
console.log(typeof getLeaderboard);

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/shutterstock_image', (req, res)=> {
  // console.log(process.env.SHUTTERSTOCK_TOKEN);
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