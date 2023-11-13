const express = require("express");
require("dotenv").config();const rotas = require("./routes");
const rotas = require("./routes");
const cors = require("cors")

const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors);
app.use(rotas);
app.use("*", (req,res)=>{
    res.status(404).json({message: `Rota '${req.baseUrl}' não encontrada.`});
});

module.exports = app;
