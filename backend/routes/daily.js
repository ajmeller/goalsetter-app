const express = require("express");
const daily = express.Router();
const pool = require("../pg-connection-pool");

daily.get("/:id/:date", (req, res) => {
  pool
    .query(
      `SELECT * FROM daily_entries WHERE user_id = '${req.params.id}' AND date = '${req.params.date}'`
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err));
});

daily.post("/update", (req, res) => {
  const date = req.body.date;
  const completed = req.body.completed;
  const comment = req.body.comment;
  const userId = req.body.userId;
  const mood = req.body.mood;

  pool
    .query(
      `INSERT INTO daily_entries (date, completed, comment, user_id, mood) VALUES ('${date}', ${completed}, '${comment}', '${userId}, ${mood}')`
    )
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => console.log(error));
});

module.exports = daily;
