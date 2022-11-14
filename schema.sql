CREATE TABLE IF NOT EXISTS leaderboard(
  Username varchar(255) NOT NULL,
  Difficulty varchar(255) CHECK (Difficulty in ('Easy','Medium','Hard')) NOT NULL,
  Date timestamp DEFAULT CURRENT_TIMESTAMP,
  Image_Category varchar(255) NOT NULL,
  Score int
);