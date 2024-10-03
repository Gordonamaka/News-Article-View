require('dotenv').config({ path: '../.env' });
const express       = require('express');
const router        = express();
const cookieSession = require('cookie-session');

router.use(cookieSession({
    name: 'news_assessment',
    keys: [ process.env.keys ],
}));

// Endpoint receives request from the frontend and runs the req.session in order to delete cookie and logout user
router.post('/', (req, res) => {
	req.session = null;
    console.log('almost there...')
    res.status(200).send('Sucessfully logged out!');
});

module.exports = router;