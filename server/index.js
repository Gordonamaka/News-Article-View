require('dotenv').config({ path: '../.env' });
const express       = require('express');
const cors          = require('cors');
const helmet        = require("helmet");
const bodyParser    = require('body-parser');
const app           = express();
const PORT          = process.env.PORT;
const cookieSession = require('cookie-session');


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
// In memory credentials storage
app.use(cookieSession({
  name: 'news_assessment',
  keys: [ process.env.keys ],
}));

// Landing
app.get("/", (req, res) => {
  res.send("News Article Backend");
})

// Api routes & tasks

// Users JSON
const usersRoute = require('../routes/api/users');
app.use('/users', usersRoute);

// News Practice Endpoint
const newsRoute = require('../routes/api/newsEndpoint');
app.use('/news', newsRoute);

// Api Tasks

// Search
const searchRoute = require('../routes/tasks/searchEndpoint');
app.use('/search', searchRoute)

// Register
const registerRoute = require('../routes/tasks/register');
app.use('/register', registerRoute);

// Login
const loginRoute = require('../routes/tasks/login');
app.use('/login', loginRoute);

// Favourites Endpoint -- Need to map with an :id param
const articleFavouritesRoute = require('../routes/tasks/favourites');
app.use('/users/favourites', articleFavouritesRoute);

// Listener
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })

