import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import styles from "@/styles/Todo.module.css";

// Define the properties expected for the Todo component
interface TodoProps {
  id: string;
  name: string;
  showDone: boolean;
  remove: (id: string) => void;
  edit: (id: string, name: string) => void;
}

// Define the Todo functional component
export const Todo: React.FC<TodoProps> = ({ id, name, showDone, remove, edit }) => {
  // State to manage whether the task is crossed off
  const [done, setDone] = useState(false);
  // State to manage whether the task is in edit mode
  const [isEditable, setEditable] = useState(false);
  // State to manage the new name of the task while editing
  const [newName, setNewName] = useState(name);

  // Toggle the done state
  const toggleDone = () => {
    setDone(!done);
  };

  // Toggle the edit mode state and reset newName if exiting edit mode
  const toggleEdit = () => {
    setEditable(!isEditable);
    if (!isEditable) {
      setNewName(name);
    }
  };

  // Handle changes to the input field for editing the task name
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  // Handle saving the edited task name
  const handleEditSave = () => {
    edit(id, newName);
    toggleEdit();
  };

  return (
    <div className={`${done && showDone ? styles.hidden : styles.todo }`}>
      {/* Input field for editing the task name */}
      <input
        type="text"
        className={`${isEditable ? styles.edit : styles.hidden}`}
        value={newName}
        onChange={handleInputChange}
      />
      {/* Task name display, toggle done state on click */}
      <p
        className={`${done ? styles.done : ""} ${
          isEditable ? styles.hidden : ""
        }`}
        onClick={toggleDone}
      >
        {name}
      </p>
      <div className={styles.iconsWrapper}>
        {/* Save edit icon, only visible in edit mode */}
        <FontAwesomeIcon
          icon={faCheck}
          className={`${isEditable ? styles.icon : styles.hidden}`}
          onClick={handleEditSave}
        />
        {/* Edit icon, hidden in edit mode */}
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={`${isEditable ? styles.hidden : styles.icon}`}
          onClick={toggleEdit}
        />
        {/* Delete icon */}
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.icon}
          onClick={() => remove(id)}
        />
      </div>
    </div>
  );
};
