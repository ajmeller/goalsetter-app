const { Pool } = require("pg");
const credentials = new Pool({
  user: "swatnplewkcbgk",
  password: "cc96b0f0ff9ac4e3659ce101dc21397ee2a016063e4bfa46b2651d66e4d9686d",
  host: "ec2-54-225-130-212.compute-1.amazonaws.com",
  port: 5432,
  database: "d3temh9gniq1o6",
  ssl: { rejectUnauthorized: false },
});

module.exports = credentials;
