# Tile 2 Image #
  A puzzle game in which the player rotates tiles of a split up randomly selected image to try to restore the original image as fast as possible. Score is based on time, tile count, and hints used count. Results are saved to a leaderboard.

<a href="http://ec2-52-14-197-230.us-east-2.compute.amazonaws.com:3000/">Deployment</a>

## Tech Stack ##
<p align="left"> <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://babeljs.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg" alt="babel" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> </p>

## Videos ##
https://user-images.githubusercontent.com/37204126/223303865-0ad0901e-240b-4f77-ba89-c8bedb489860.mp4

<p align="center">1 full round of gameplay.</p>

<br>

https://user-images.githubusercontent.com/37204126/223302863-b80f8043-ae25-4182-ae43-04fda4fd59c5.mp4

<p align="center">What some of the leaderboard and Shutterstock Image API data looked like.</p>

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
