const express = require("express");
const daily = express.Router();
const pool = require("../pg-connection-pool");

daily.get("/dates/:id", (req, res) => {
  pool
    .query(
      `SELECT DISTINCT date FROM daily_entries WHERE user_id = '${req.params.id}' ORDER BY date ASC`
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err));
});

daily.get("/history/:id", (req, res) => {
  pool
    .query(
      `SELECT de.*, g.goal_description FROM daily_entries de
      JOIN goals g ON g.goal_id = de.goal_id
      WHERE de.user_id = '${req.params.id}'`
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err));
});

daily.get("/stats/:id", (req, res) => {
  pool
    .query(
      `SELECT de.*, g.goal_description FROM daily_entries de
      JOIN goals g ON g.goal_id = de.goal_id
      WHERE de.user_id = '${req.params.id}'
      ORDER BY de.date ASC`
    )
    .then((result) => {
      const daysTotal = result.length;
      const stats = {
        firstEntry: new Date(),
        daysTotal: daysTotal,
        percentageComplete: 0,
        longestStreak: 0,
        averageMood: "",
      };
      res.send(stats);
    })
    .catch((err) => console.log(err));
});

daily.get("/:id/:date", (req, res) => {
  pool
    .query(
      `SELECT de.*, g.goal_description FROM daily_entries de
      JOIN goals g ON g.goal_id = de.goal_id
      WHERE de.user_id = '${req.params.id}' AND de.date = '${req.params.date}'`
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err));
});

daily.post("/today/add", (req, res) => {
  const date = req.body.date;
  const completed = req.body.completed;
  const comment = req.body.comment;
  const userId = req.body.userId;
  const mood = req.body.mood;
  const goalId = req.body.goalId;

  pool
    .query(
      `INSERT INTO daily_entries (date, completed, comment, user_id, mood, goal_id) VALUES ('${date}', ${completed}, '${comment}', '${userId}', '${mood}', ${goalId})`
    )
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => console.log(error));
});

module.exports = daily;
