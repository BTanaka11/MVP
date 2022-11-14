const axios = require('axios');
require('dotenv').config();

axios({
  method: 'get',
  url: 'https://api.shutterstock.com//v2/images/categories',
  headers: {Authorization: `Bearer ${process.env.SHUTTERSTOCK_API_TOKEN}`}
})
.then((val)=>{console.log(val.data)})
.catch((err)=>{console.log(err)})