require('dotenv').config({ path: '../.env' });
const express       = require('express');
const cors          = require('cors');
const helmet        = require("helmet");
const bodyParser    = require('body-parser');
const app           = express();
const PORT          = process.env.PORT;
const cookieSession = require('cookie-session');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],        
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], 
};

app.use(cors(corsOptions));
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
  res.send("News Article Backend, with CORS Configured API");
})

// Api routes & tasks

// Users JSON
const usersRoute = require('../routes/api/usersEndpoint');
app.use('/api/users', usersRoute);

// News Practice Endpoint
const newsRoute = require('../routes/api/newsEndpoint');
app.use('/api/news', newsRoute);

// Fetch Content Endpoint
const contentRoute = require('../routes/api/contentEndpoint');
app.use('/api/fetchArticleContent', contentRoute);

// Api Tasks

// Search
const searchRoute = require('../routes/tasks/search');
app.use('/tasks/search', searchRoute)

// Register
const registerRoute = require('../routes/tasks/register');
app.use('/tasks/register', registerRoute);

// Login
const loginRoute = require('../routes/tasks/login');
app.use('/tasks/login', loginRoute);

// Add Favourites
const articleFavouritesRoute = require('../routes/tasks/favourites');
app.use('/tasks/favourites', articleFavouritesRoute);

// Listener
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })

