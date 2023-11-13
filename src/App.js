const express = require("express");
require("dotenv").config();const rotas = require("./routes");
const rotas = require("./routes");
const app = express();

app.use(express.json());
app.use(rotas);
module.exports = app;
