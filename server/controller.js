const axios = require('axios');
require('dotenv').config();

const retrieveCategories = () => {
  return axios({
    method: 'get',
    url: 'https://api.shutterstock.com/v2/images/categories',
    headers: {Authorization: `Bearer ${process.env.SHUTTERSTOCK_API_TOKEN}`}
  })
}

module.exports = {
  retrieveCategories: retrieveCategories
}