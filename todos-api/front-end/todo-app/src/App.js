import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const retrieveTodoList = async (setTodoList) => {
  try {
    const { data } = await axios.get("http://localhost:5001/todos");
    setTodoList([...data]);
  } catch (error) {
    console.log(error);
  }
};

const addNewToDo = async (title, setTodoList) => {
  try {
    await axios.post("http://localhost:5001/todos", title);
    retrieveTodoList(setTodoList);
  } catch (error) {
    console.log(error);
  }
};

const toggleToDoStatus = async (todo, todoList, setTodoList, index) => {
  try {
    const newToDo = { completed: !todo.completed };
    const { data } = await axios.put(
      "http://localhost:5001/todos/" + todo._id,
      newToDo
    );
    todoList.splice(index, 1, data);
    setTodoList([...todoList]);
  } catch (error) {
    console.log(error);
  }
};

const deleteToDo = async (todoID, todoList, setTodoList, index) => {
  try {
    await axios.delete("http://localhost:5001/todos/" + todoID);
    todoList.splice(index, 1);
    setTodoList([...todoList]);
  } catch (error) {
    console.log(error);
  }
};

const handleChange = (e, title, setTitle) => {
  const { value, name } = e.target;
  setTitle({ ...title, [name]: value });
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState({ title: "" });

  useEffect(() => {
    retrieveTodoList(setTodoList);
  }, []);

  return (
    <div className="app-container">
      <header className="todo-list-header">Todo List</header>
      <div className="add-todo-container">
        <input
          name="title"
          placeholder="To Do Title"
          value={title.title}
          onChange={(e) => handleChange(e, title, setTitle)}
        />
        <button
          className="add-button"
          onClick={() => addNewToDo(title, setTodoList)}
        >
          ADD
        </button>
      </div>
      <div className="todo-list-container">
        {todoList.map((todo, index) => (
          <div key={todo._id} className="todo">
            <button
              className="text-container"
              onClick={() =>
                toggleToDoStatus(todo, todoList, setTodoList, index)
              }
            >
              <i
                className={
                  todo.completed ? "bi bi-check-square" : "bi bi-square"
                }
                style={{ color: todo.completed ? "blue" : "black" }}
              ></i>
              <p
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "grey" : "black",
                }}
              >
                {todo.title}
              </p>
            </button>
            <button
              className="delete-button"
              onClick={() => deleteToDo(todo._id, todoList, setTodoList, index)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
