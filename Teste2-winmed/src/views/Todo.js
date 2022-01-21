/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup,
} from "reactstrap";

const storageTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos"));
};

function Todo(props) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([...getTodos()]);
  const [filter, setFilter] = useState("all");

  const handleAdd = (e) => {
    const text = input.trim();
    if (!text) return;
    if (e.key === "Enter") {
      const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const handleToogleCompleted = (id) => {
    todos.find((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return true;
      }
      return false;
    });
    setTodos([...todos]);
  };

  const handleDelete = (id) => {
    todos.find((todo, index) => {
      if (todo.id === id) {
        todos.splice(index, 1);
        return true;
      }
      return false;
    });
    setTodos([...todos]);
  };

  const handleEdit = (id, e) => {
    todos.find((todo) => {
      if (todo.id === id) {
        todo.text = e.target.value;
        return true;
      }
      return false;
    });
    setTodos([...todos]);
  };

  const handleClearCompleted = () => {
    for (let index = 0; index < todos.length; index++) {
      if (todos[index].completed) {
        todos.splice(index, 1);
        index--;
      }
    }
    setTodos([...todos]);
  };

  useEffect(() => {
    storageTodos(todos);
  }, [todos]);

  let itemsRendered = 0;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card
              className={
                props.lightDarkMode.background === "black"
                  ? "bg-dark"
                  : "bg-white"
              }
            >
              <CardHeader>
                <CardTitle
                  tag="h5"
                  className={`text-center  ${
                    props.lightDarkMode.background === "black"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  TODOS
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleAdd}
                  className={`p-3 ${
                    props.lightDarkMode.background === "black"
                      ? "bg-dark text-white"
                      : ""
                  }`}
                  placeholder="What needs to be done?"
                />
                <div className="todo-list">
                  {todos.map((todo, index) => {
                    if (filter === "active" && todo.completed) return;
                    if (filter === "completed" && !todo.completed) return;
                    itemsRendered++;
                    return (
                      <div
                        key={todo.id}
                        className={`handle-delete-icon todo-item d-flex justify-content-between mt-3 ${
                          index === todos.length - 1 ? "" : "border-bottom"
                        }`}
                      >
                        <p>
                          <i
                            onClick={() => handleToogleCompleted(todo.id)}
                            className={`mx-2 pointer far fa-${
                              todo.completed
                                ? "check-circle text-success"
                                : "circle"
                            }`}
                          />
                          <input
                            value={todo.text}
                            onChange={(e) => handleEdit(todo.id, e)}
                            disabled={todo.completed ? true : false}
                            className={`transparent-input ${
                              props.lightDarkMode.background === "black"
                                ? "dark-mode-input"
                                : "light-mode-input"
                            } ${todo.completed && "completed-input"}`}
                          />
                        </p>
                        <i
                          onClick={() => handleDelete(todo.id)}
                          className="delete-icon fas fa-times"
                        />
                      </div>
                    );
                  })}
                </div>
              </CardBody>
              {todos.length ? (
                <CardFooter>
                  <hr
                    className={`${
                      props.lightDarkMode.background === "black" && "bg-white"
                    }`}
                  />
                  <div
                    className={`d-flex justify-content-between stats ${
                      props.lightDarkMode.background === "black"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    <p>{`${itemsRendered} item${
                      itemsRendered > 1 ? "s" : ""
                    } left`}</p>
                    <ButtonGroup>
                      <Button
                        onClick={() => setFilter("all")}
                        color={
                          props.lightDarkMode.background === "black"
                            ? "info"
                            : "secondary"
                        }
                      >
                        All
                      </Button>
                      <Button
                        onClick={() => setFilter("active")}
                        color={
                          props.lightDarkMode.background === "black"
                            ? "info"
                            : "secondary"
                        }
                      >
                        Active
                      </Button>
                      <Button
                        onClick={() => setFilter("completed")}
                        color={
                          props.lightDarkMode.background === "black"
                            ? "info"
                            : "secondary"
                        }
                      >
                        Completed
                      </Button>
                    </ButtonGroup>
                    {todos.find((todo) => todo.completed) ? (
                      <Button
                        onClick={handleClearCompleted}
                        color={
                          props.lightDarkMode.background === "black"
                            ? "info"
                            : "secondary"
                        }
                      >
                        Clear Completed
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </CardFooter>
              ) : (
                ""
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Todo;
