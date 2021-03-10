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
    .catch(() => console.log("error"));
});

daily.post("/"),
  (req, res) => {
    const date = req.body.date;
    const completed = req.body.completed;
    const comment = req.body.comment;
    const userId = req.body.userId;

    console.log(date, completed, comment, userId);
    pool
      .query(
        `INSERT INTO daily_entries (date, completed, comment, user_id) VALUES ('${date}', ${completed}, '${comment}', '${userId}')`
      )
      .then((result) => {
        res.sendStatus(201);
      })
      .catch(() => console.log("error"));
  };

module.exports = daily;
