const express = require("express");
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://2morrowstorage.blob.core.windows.net", "http://localhost:5173"],
  })
);
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota '${req.baseUrl}' não encontrada.` });
});

module.exports = app;
