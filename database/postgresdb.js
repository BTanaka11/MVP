const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: 'postgres',
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.POSTGRESQL_PORT
})

const getLeaderboard = ()=> {
  return pool.query('SELECT * FROM leaderboard ORDER BY score DESC');
}

const addToLeaderboard = (data) => {
  return pool.query('INSERT INTO leaderboard(Username, Difficulty, Image_Category,Score) VALUES ($1, $2, $3, $4)', [data.username, data.difficulty, data.image_category, data.score]);
}

module.exports = {
  getLeaderboard: getLeaderboard,
  addToLeaderboard: addToLeaderboard
}