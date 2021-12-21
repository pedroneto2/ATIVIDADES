const express = require("express");
const mongoose = require("mongoose");
const route = express();

const Todo = require("../models/TodoSchema");

route.get("/", async (req, resp) => {
  try {
    const todos = await Todo.find();
    resp.status(200).send(todos);
  } catch (error) {
    console.log(error);
    return resp.status(500).send({ message: error.message });
  }
});

route.post("/", async (req, resp) => {
  const { title, completed = "false" } = req.body;

  if (!title) {
    return resp.status(400).send({ message: "title is required!" });
  }
  const newTodo = new Todo({ title, completed });
  try {
    await newTodo.save();
    return resp.status(201).send(newTodo);
  } catch (error) {
    console.log(error);
    return resp.status(500).send({ message: error.message });
  }
});

route.put("/:id", async (req, resp) => {
  const { id } = req.params; //dependendo a ID que eu passar, quebra o server
  const { title, completed = "false" } = req.body;

  const isValidID = mongoose.Types.ObjectId.isValid(id); // verifica se o id é um ObjectID para nao crashar o server

  if (!isValidID) {
    return resp.status(400).send({ message: "invalid ID!" });
  }

  if (title === "") {
    return resp.status(400).send({ message: "title can not be empty!" });
  }

  try {
    const editedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!editedTodo) {
      return resp.status(404).send({ message: "todo not found!" });
    }
    return resp.status(200).send(editedTodo);
  } catch (error) {
    console.log(error);
    return resp.status(500).send({ message: error.message });
  }
});

route.delete("/:id", async (req, resp) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id); // verifica se o id é um ObjectID para nao crashar o server

  if (!isValidID) {
    return resp.status(400).send({ message: "invalid ID!" });
  }

  try {
    const deleted = await Todo.findByIdAndDelete(id, { rawResult: true });
    if (!deleted.value) {
      return resp.status(404).send({ message: "todo not found!" });
    }
    return resp.status(200).send({ message: "todo successfully deleted!" });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({ message: error.message });
  }
});

module.exports = route;
