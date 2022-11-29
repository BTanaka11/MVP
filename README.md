## Tile 2 Image Puzzle ##
  A puzzle game in which the player rotates tiles of a split up randomly selected image to try to restore the original image as fast as possible. Score is based on time, tile count, and hints used count. Results are saved to a leaderboard.

## Background ##
  Created as a minimum viable product (MVP) using an iterative and incremental development process. Project requirements were that it had to be a full stack web app, completed within 3 days, contain a database, and deployable on the cloud if desired.

## Game Details ##
  From the game settings modal, pick a tile count up to 100. Higher counts will increase your maximum potential score. Image categories are from Shutterstock API data, and whichever one you pick will further narrow down to a random image within that category. Category has no impact on score.

  Once the game starts, the image will be cropped. The number of rows and columns are automatically determined by checking all possible combos and picking the one that maximizes total tile surface area given the following constraints: each tile is square, the cropped board is rectangular or square, the aspect ratio isn't changed, and the original image's pixel dimensions aren't changed. Care was taken to allow it to work with arbitrary image dimensions and tile counts (100 limit picked purely to prevent potential performance issues).

  Each tile is randomly rotated 0, 90, 180, or 270 degrees. You'll see your score start high and decrease with time. The score formula is: 300 / time * tile count * (.5 ^ hints used count). Clicking Hint temporarily highlights unsolved tiles but applies a score penalty of 50% reduction. Clicking a tile rotates it 90 degrees clockwise. Solving all tiles displays your score for a few seconds, saves it to leaderboard, and brings you to the homepage.

## How to Run App Locally ##
  1. Obtain a Shutterstock free API key from https://www.shutterstock.com/api/pricing?utm_source=shutterstock&utm_medium=banner&utm_campaign=developer.portal

  2. You'll need Postgres installed and a leaderboard table created per the schema.sql file.

  3. Create a .env file containing the following, filled in with your info from steps 1-2:
      SHUTTERSTOCK_API_TOKEN=
      SHUTTERSTOCK_KEY=
      SHUTTERSTOCK_SECRET=
      POSTGRESQL_USER=
      POSTGRESQL_PASSWORD=
      POSTGRESQL_PORT=
      POSTGRESQL_HOST=
      POSTGRESQL_DATABASE_NAME=

      reminder: using default Postgres configuration, your POSTGRESQL_PORT will likely be "5432" and POSTGRESQL_HOST be "localhost"

  4. Run command lines "npm install" and "npm run start-game"

  5. Open app in browser. Happy rotating!

https://user-images.githubusercontent.com/37204126/204606675-f2c9e3a9-d876-4587-82fe-13a62b689e37.mp4
