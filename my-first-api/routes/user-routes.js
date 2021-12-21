const express = require("express");
const router = express();

const userData = require("../data");

//rota que lista os usuarios
router.get("/users", (request, response) => {
  const queryKeys = Object.keys(request.query);
  if (queryKeys.length > 0) {
    const filteredData = userData.filter((user) =>
      queryKeys.every((key) => {
        const regex = new RegExp(request.query[key], "gi");
        return regex.test(user[key]);
      })
    );
    return response.json(filteredData);
  }
  response.json(userData);
}); //registrei uma rota GET  '/users' dentro do user-routes!

//rota que retorna um usuario pelo ID
router.get("/users/:id", (request, response) => {
  const user = userData.find((user) => user.id === +request.params.id);
  response.json(user);
});

module.exports = router;
