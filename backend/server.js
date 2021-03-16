const express = require("express");
const daily = require("./routes/daily");
const goals = require("./routes/goals");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/daily", daily);
app.use("/goals", goals);

app.listen(3000);
