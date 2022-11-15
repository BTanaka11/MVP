const axios = require('axios');
require('dotenv').config();

const retrieveCategories = () => {
  return axios({
    method: 'get',
    url: 'https://api.shutterstock.com/v2/images/categories',
    headers: {Authorization: `Bearer ${process.env.SHUTTERSTOCK_API_TOKEN}`}
  })
}
const retrieveRandomImage = (img_category) => {
  return axios({
    method: 'get',
    url: 'https://api.shutterstock.com/v2/images/search',
    headers: {Authorization: `Bearer ${process.env.SHUTTERSTOCK_API_TOKEN}`},
    params: {category: img_category}
  })
}
module.exports = {
  retrieveCategories: retrieveCategories,
  retrieveRandomImage: retrieveRandomImage
}