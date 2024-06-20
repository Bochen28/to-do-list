"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/TodoCard.module.css";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { TodoTypes } from "./types";
import { setLocalArray, getLocalArray } from "@/local/localStorage";

// Define the TodoCard functional component
export const TodoCard: React.FC = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  // State to hide or show done tasks
  const [showDone, setShowDone] = useState(true);

  // useEffect hook to load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = getLocalArray();
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Function to remove a todo item by its id
  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setLocalArray(updatedTodos);
  };

  // Function to edit a todo item's name by its id
  const editTodo = (id: string, name: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name } : todo
    );
    setTodos(updatedTodos);
    setLocalArray(updatedTodos);
  };

  // Function to set visibility of done todos
  const showDoneTodos = () => {
    setShowDone(!showDone);
  }

  return (
    <div className={styles.card}>
      {/* TodoForm component to add new todos */}
      <TodoForm setTodos={setTodos} />
      <button className={styles.showButton} onClick={showDoneTodos}>Show/Hide done</button>
      {/* Map over the todos state to render each Todo component */}
      {todos.map((item) => (
        <Todo
          key={item.id}
          id={item.id}
          name={item.name}
          showDone={showDone}
          remove={removeTodo}
          edit={editTodo}
        />
      ))}
    </div>
  );
};
