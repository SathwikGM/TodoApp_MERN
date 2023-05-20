import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import axios from "axios";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };
  const addTodo = (newTodo) => {
    axios
      .post("http://localhost:3000/addTodo", newTodo)
      .then((response) => {
        console.log(response);
        fetchTodos(); // Trigger fetching of todos after successful addition
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTodo = (updatedTodo) => {
    axios
      .put(`http://localhost:3000/todos/update`, updatedTodo)
      .then((response) => {
        console.log(response);
        fetchTodos();
      })
      .catch((error) => {
        console.log("Error updating todo:", error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        // Handle successful deletion
        fetchTodos();
      })
      .catch((error) => {
        console.log("Error deleting", error);
      });
  };

  const todo = todos.map((todo) => {
    return (
      <TodoList
        key={todo._id}
        id={todo._id}
        task={todo.task}
        completed={todo.completed}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    );
  });
  return (
    <div className="Todo">
      <AddTodoForm addTodo={addTodo} />
      <ul>{todo}</ul>
    </div>
  );
};

export default Todo;
