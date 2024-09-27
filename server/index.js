require('dotenv').config({ path: '../.env' });
const express    = require('express');
const cors       = require('cors');
const helmet     = require("helmet");
const bodyParser = require('body-parser');
const app        = express();
const PORT       = process.env.PORT;


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


// Landing
app.get("/", (req, res) => {
  res.send("Article Backend");
})

// Api routes & tasks

// Users JSON
const usersRoute = require('../routes/api/users');
app.use('/users', usersRoute);


// Api Tasks

// News Practice Endpoint
const newsRoute = require('../routes/tasks/newsEndpoint');
app.use('/news', newsRoute);

// Article Details Endpoint?
const articleDetailsRoute = require('../routes/tasks/articleDetails');
app.use('/news/details', articleDetailsRoute);

// Favourites Endpoint
const articleFavouritesRoute = require('../routes/tasks/favourites');
app.use('/news/favourites', articleFavouritesRoute);

const searchRoute = require('../routes/tasks/searchEndpoint');
app.use('/search', searchRoute)

// Register
const registerRoute = require('../routes/tasks/register');
app.use('/register', registerRoute);

// Login
const loginRoute = require('../routes/tasks/login');
app.use('/login', loginRoute);


// Listener
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })

