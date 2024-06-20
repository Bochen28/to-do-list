import React, { useState } from "react";
import { TodoTypes } from "./types";
import styles from "@/styles/TodoForm.module.css";
import { v4 as uuidv4 } from "uuid";
import { setLocalArray, getLocalArray } from "@/local/localStorage";

// Define the properties expected for the TodoForm component
interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

// Define the TodoForm functional component
export const TodoForm: React.FC<TodoFormProps> = ({ setTodos }) => {
  // State to manage the name of the new todo
  const [name, setName] = useState("");

  // Handle the form submission to add a new todo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;

    // Create a new todo object
    const newTodo: TodoTypes = {
      id: uuidv4(),
      name,
    };

    // Update the todos state with the new todo
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setName(""); // Clear the input field

    // Update the local storage with the new todo list
    const updatedTodos = [...getLocalArray(), newTodo];
    setLocalArray(updatedTodos);
  };

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      {/* Input field to enter the name of the new todo */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new todo"
      />
      {/* Submit button to add the new todo */}
      <button type="submit">Add Todo</button>
    </form>
  );
};
