First and foremost, run `npm run install` to install all necessary dependencies in `BOTH` client and main parent folders.

Once that is done you can start the application... HOWEVER:

You will need to create an account and get an apikey for the newsAPI which is used within this app to fetch news articles: [text](https://newsapi.org/).

This assessment uses THREE data stores: local storage, cookieSession & PSQL.

You will need to install PSQL to use this application correctly (Most updated version should do.)

You will need to create a user, create a database, and upload the tables within the db/schema folder.

Afterwards, you should check to make sure the database configuration is correct (`you can use the seeds files to fill the database with all queries except for search. You can also use the mock-api folder data in the client folder to manually fill the seed for 02_articles.sql - but that should not be necessary.`)

The easiest way to run this application is with the `npm run start`

### `npm start`
"npm run dev": `npm run server`,
"npm run server": `cd server && nodemon index.js`,
"npm run client": `cd client && npm start`,
"npm run start": `concurrently \"npm run server\" \"npm run client\"`

It is best to run the server & client concurrently as the server API supplies data to the client frontend.

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view the client frotnend it in the browser.
 
While you can open [http://localhost:3000](http://localhost:3000) to view the backend express server in the browser. (See index.js in server to see url endpoints).

## Application Architecture

  - The architecture of this application is very simple. A react frontend, with a Node.js & Express.js backend.
  - This application makes calls to the NewsAPI api, you can find more information about the site here: [text](https://newsapi.org/)
  - The express backend is used as an api handler for all the calls from the frontend and calls out to the NewsAPI.
  - Data is then returned to the frontend which is then styled with regular CSS.
  - This application uses PSQL to house user data, article data, and search history over multiple sessions.
  - The application uses pagination over endless scrolling to ensure the API is not overloaded as it limits free users to 100 calls.
  - `IMPORTANT NOTE:` In order to have additional features like a database, this application functions as a single page application. So, `reloading the application will cause the application to restart.` However, once you have registered a user and logged in, your data and information will be saved under your account.
  - All Endpoints have been accounted for & documented with Swagger. Once you run the server you can see it at: [text](http://localhost:3000/api-docs/)

## Special considerations & Features:

- The news article content did not come with the original api call so it had to be extracted separately (if you check within articleDetails.tsx - local storage was used for this purpose).

- The newsEndpoint & contentEndpoint was left available if you ever wanted to change the keyword or url (for contentEndpoint you can do it manually) and see how the api works.

- To ensure that user data is maintained, I have constructed a user register, login, and logout process with psql to sustain it by mapping all user data to a unique ID that is held within a cookie.session that is mapped during the login process.
`IMPORTANT NOTE: Your session will prolong until or unless you use the logout button functionality that will clear your cookie ID.`

- The users favourite page does not have pagination. Should have endless scroll. You will have to close the window to leave.

- For the sake of time, the user register & login fields have minimal validation schema's, a few edge cases may be missed, and the details page on within the users favourites list does not return the article source correctly at the top (Still sources to original URL). Please be mindful of that.

- If there are any additional questions or it requires a walkthrough, you can reach me at my email: amobimak@gmail.com