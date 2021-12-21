const express = require("express");

const userRoutes = require("./routes/user-routes");

const app = express();

//Criar um middleware de configuração de rotas
app.use("/", userRoutes); // TODO REQUEST QUE FOR FEITO A PARTIR DA ROTA '/', ELE VAI PROCURAR ESSA ROTA DENTRO DO USER-ROUTES

const port = 5000;
app.listen(port, () => console.log("Running on port " + port));
