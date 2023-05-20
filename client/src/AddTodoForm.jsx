import { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  const handleTodoChange = (event) => {
    const { name, value, checked } = event.target;
    const updatedTodo = name === "completed" ? checked : value;
    setNewTodo({
      ...newTodo,
      [name]: updatedTodo,
    });
  };

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    console.log(newTodo);
    addTodo(newTodo);
    setNewTodo({ id: "", task: "" });
  };

  return (
    <form onSubmit={handleTodoSubmit} action="">
      {/* <p>{newTodo.task}</p> */}
      <input
        type="text"
        placeholder="add todo"
        name="task"
        value={newTodo.task}
        onChange={handleTodoChange}
      />
      <input
        type="checkbox"
        name="completed"
        checked={newTodo.completed}
        onChange={handleTodoChange}
      />
      <button>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
