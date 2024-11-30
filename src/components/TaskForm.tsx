import React, { useState } from "react";
import { Task } from "../../types";
import { fetchTaskById } from "../services/api";
import "./TaskForm.css";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id">) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [parentTaskId, setParentTaskId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!name.trim()) return;

    // Check parent task is valid if not provided then leave it empty as it is optional
    if (parentTaskId === "") {
      onSubmit({ name, status: "IN PROGRESS", parentTaskId: "" });
      setName("");
      setParentTaskId("");
      setErrorMessage("");
      return;
    }

    const parentTask = await fetchTaskById(parentTaskId);
    console.log(parentTask);
    if (!parentTask) {
      setErrorMessage("Parent task is not valid");
      return;
    }
    onSubmit({ name, status: "IN PROGRESS", parentTaskId: parentTaskId });
    setName("");
    setParentTaskId("");
    setErrorMessage("");
  };

  return (
    <div className="task-form">
      <div className="form-group">
        <label htmlFor="task-name">Task Name</label>
        <input
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="parent-task-id">Parent Task ID (optional)</label>
        <input
          id="parent-task-id"
          type="text"
          value={parentTaskId || ""}
          onChange={(e) => setParentTaskId(e.target.value)}
          placeholder="Enter parent task ID"
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Create Task
      </button>
      <small className="error-message">{errorMessage}</small>
    </div>
  );
};

export default TaskForm;
