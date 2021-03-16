const express = require("express");
const goals = express.Router();
const pool = require("../pg-connection-pool");

goals.get("/:id", (req, res) => {
  pool
    .query(`SELECT * FROM goals WHERE user_id = '${req.params.id}'`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err));
});

goals.post("/new", (req, res) => {
  const userId = req.body.userId;
  const goalDesc = req.body.goal;

  pool
    .query(
      `UPDATE goals SET is_current = false WHERE user_id = '${userId}';
      INSERT INTO goals (goal_description, user_id, is_current) VALUES ('${goalDesc}', '${userId}', true);`
    )
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => console.log(error));
});

module.exports = goals;
