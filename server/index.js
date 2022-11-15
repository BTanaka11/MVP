const express = require('express');
const {getLeaderboard} = require('../database/postgresdb.js');
const {retrieveCategories, retrieveRandomImage} = require('./controller.js');

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

  res.send({
    url: 'https://ak.picdn.net/shutterstock/photos/2112280592/watermark_1000/223ca7790ff5d3ef7d19c18efb62885f/preview_1000-2112280592.jpg',
    width: 1000,
    height: 666
  });

  // retrieveRandomImage()
  // .then((val)=> {
  //   let randomIndex = Math.floor(Math.random()*val.data.data.length)
  //   let datum = val.data.data[randomIndex].assets.preview_1000;
  //   if (datum.url) {
  //     res.send(datum);
  //   } else {
  //     res.status(500).send();
  //   }
  // })
  // .catch((err)=> {
  //   res.status(500).send();
  // })
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