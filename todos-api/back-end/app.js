const express = require("express");
const allowCors = require("./config/cors");

const app = express();

const todosRoute = require("./routes/Todos");

require("./database/Database");

app.use(express.json());
app.use(allowCors);
app.use("/todos", todosRoute);

port = 5001;

app.listen(port, () => console.log("Backend running on port " + port));
