const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then((resp) => {
    console.log("Succesfully connect to database " + resp.connection.name);
  })
  .catch((error) => console.log(error));
