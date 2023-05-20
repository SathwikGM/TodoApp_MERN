import axios from "axios";
import { useState } from "react";

const TodoList = ({ task, id, completed, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTask, setUpdateTask] = useState({
    id: id,
    task: task,
    completed: completed,
  });
  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleEdit = (id) => {
    setIsEditing(!isEditing);
  };

  const handleTodoChange = (event) => {
    const { name, value, checked } = event.target;
    const updatedValue = name === "completed" ? checked : value;
    setUpdateTask({ ...updateTask, [name]: updatedValue });
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    updateTodo(updateTask);

    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <form action="" onSubmit={handleUpdateSubmit}>
        <input
          type="text"
          value={updateTask.task}
          name="task"
          onChange={handleTodoChange}
        />
        <input
          type="checkbox"
          name="completed"
          checked={updateTask.completed}
          onChange={handleTodoChange}
        />
        <button>Save</button>
      </form>
    );
  } else {
    return (
      <div>
        <li>{task}</li>
        <input
          type="checkbox"
          checked={updateTask.completed}
          onChange={handleTodoChange}
        />
        <button onClick={() => handleEdit(id, completed)}>Edit</button>
        <button onClick={() => handleDelete(id)}>X</button>
      </div>
    );
  }
};
export default TodoList;
