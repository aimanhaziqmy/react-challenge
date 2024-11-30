import React from "react";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";
import "./tasklistingpage.css";

const TaskListingPage: React.FC = () => {
  const { tasks, updateTask } = useTasks();

  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  
  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks;

  return (
    <div className="app">
      <main className="main-content">
        <div className="task-listing-page">
            <div className="status-filter">
                <label htmlFor="status-filter">Filter by Status:</label>
                <br/>
                <select
                    id="status-filter"
                    value={statusFilter || ""}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                    <option value="COMPLETE">Complete</option>
                </select>
            </div>
          <h1>Task Listing</h1>
          <TaskList tasks={filteredTasks} onStatusChange={updateTask} />
        </div>
      </main>
    </div>
  );
};

export default TaskListingPage;
