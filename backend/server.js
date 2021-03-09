const express = require("express");
const daily = require("./routes/daily");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/publicser"));
app.use("/", daily);

app.listen(3000);
