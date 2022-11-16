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
  return pool.query('INSERT INTO leaderboard(Username, Image_Category, Tile_Count, Time_to_Solve, Score) VALUES ($1, $2, $3, $4, $5)', [data.Username, data.Image_Category, data.Tile_Count, data.Time_to_Solve, data.Score]);
}

module.exports = {
  getLeaderboard: getLeaderboard,
  addToLeaderboard: addToLeaderboard
}