require('dotenv').config({ path: '../.env' });
const express       = require('express');
const router        = express();
const cookieSession = require('cookie-session');

router.use(cookieSession({
    name: 'news_assessment',
    keys: [ process.env.keys ],
}));

/**
 * @swagger
 * /tasks/logout:
 *   post:
 *     summary: Logs out the currently logged-in user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Successfully logged out!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
*/

// Endpoint receives request from the frontend and runs the req.session in order to delete cookie and logout user
router.post('/', (req, res) => {
	req.session = null;
    console.log('User Logged Out')
    res.status(200).send('Sucessfully logged out!');
});

module.exports = router;