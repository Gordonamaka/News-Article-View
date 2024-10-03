const express      = require('express');
const router       = express();
const { Pool }     = require("pg");
const { dbParams } = require("../../db/params/dbParams");

const pool = new Pool(dbParams);

/**
 * @swagger
 * /tasks/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-01T00:00:00Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error: [error message]"
*/

router.get(`/`, (req, res) => {
  pool
    .query(
      `
      SELECT * FROM USERS;
      `
    )
    .then((result) => {
      const users = result.rows;
      res.json({ users });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return router;
});

module.exports = router;
