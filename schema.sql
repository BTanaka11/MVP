CREATE TABLE IF NOT EXISTS leaderboard(
  Username varchar(255) NOT NULL,
  Date varchar(60) DEFAULT to_char(CURRENT_TIMESTAMP at time zone 'UTC', 'mm-dd-yyyy hh12:mi'),
  Image_Category varchar(255) NOT NULL,
  Tile_Count int NOT NULL,
  Time_to_Solve int NOT NULL,
  Score int
);