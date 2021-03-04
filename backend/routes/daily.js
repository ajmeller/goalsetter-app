const express = require("express");
const daily = express.Router();
const pool = require("../pg-connection-pool.js");

daily.get("/", (req, res) => {
  pool
    .query("select * from daily_entries")
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => console.log("error"));
});

module.exports = daily;
