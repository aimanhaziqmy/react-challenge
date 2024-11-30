import React from "react";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import "./taskcreationpage.css";

const TaskCreationPage: React.FC = () => {
  const { createTask } = useTasks();

  return (
    <div className="app">
      <main className="main-content">
        <div className="task-creation-page">
          <h1>Create Task</h1>
          <TaskForm onSubmit={createTask} />
        </div>
      </main>
    </div>
  );
};

export default TaskCreationPage;
