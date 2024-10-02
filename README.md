## Available Scripts

In the project directory, you can run:

### `npm start`
"npm run dev": `npm run server`,
"npm run server": `cd server && nodemon index.js`,
"npm run client": `cd client && npm start`,
"npm run start": `concurrently \"npm run server\" \"npm run client\"`

It is best to run the server & client concurrently as the server API supplies data to the client frontend.

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view the client frotnend it in the browser.
 
While you can open [http://localhost:3000](http://localhost:3000) to view the backend express server in the browser. (See index.js in server to see url endpoints).

