require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');

// API URL - Can add Date & Sort functionalities - Will not for simplicity
const API_KEY         = process.env.API_KEY

const newsFetcher = async (keyword) => {
  
  const response = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`)
  
  // Fills up console
  // console.log(response.data.articles);
  
};

newsFetcher('apple')

module.exports = newsFetcher;

