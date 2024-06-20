import { TodoTypes } from "@/components/types";

// Function to save the todos array to local storage
export const setLocalArray = (todos: object[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to retrieve the todos array from local storage
export const getLocalArray = (): TodoTypes[] => {
  const todosString = localStorage.getItem("todos");
  if (todosString) {
    return JSON.parse(todosString) as TodoTypes[];
  } else {
    return [];
  }
};
