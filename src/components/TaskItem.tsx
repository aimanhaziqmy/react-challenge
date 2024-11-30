import React, { useEffect, useState } from "react";
import { Task } from "../../types";
import { fetchTasks } from "../services/api";
import { useNavigate } from "react-router";
import "./taskitem.css";

interface TaskItemProps {
  task: Task;
  onStatusChange: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const navigate = useNavigate();
  const [numOfDependencies, setNumOfDependencies] = useState(0);
  const [numOfDependenciesDone, setNumOfDependenciesDone] = useState(0);
  const [numOfDependenciesComplete, setNumOfDependenciesComplete] = useState(0);

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const allTasks = await fetchTasks();
        const dependencies = allTasks.filter(
          (data) => data.parentTaskId === task.id
        );
        setNumOfDependencies(dependencies.length);
        setNumOfDependenciesDone(
          dependencies.filter((data) => data.status === "DONE").length
        );
        setNumOfDependenciesComplete(
          dependencies.filter((data) => data.status === "COMPLETE").length
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchDependencies();
  }, [task.id, fetchTasks]);

  const handleToggle = (targettedTask: Task) => {
    const newStatus =
      targettedTask.status === "DONE" || targettedTask.status === "COMPLETE"
        ? "IN PROGRESS"
        : "DONE";
    onStatusChange({ ...targettedTask, status: newStatus });
  };

  const handleNavigate = (id: string) => {
    navigate(`/edit/${id}`);
  }

  return (
    <>
      <div className="task-item">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={task.status === "DONE" || task.status === "COMPLETE"}
            onChange={() => handleToggle(task)}
          />
          <span className="checkmark"></span>
        </label>
        <div className="task-box">
          <div className="task-info">
            <p className="task-name">{task.name} </p>
            <p>(ID : {task.id})</p>
            <br />
            <p> Total Number of Dependencies : {numOfDependencies} </p>
            <p> Dependencies marked DONE : {numOfDependenciesDone} </p>
            <p> Dependencies marked COMPLETE : {numOfDependenciesComplete} </p>
            <p>
              {" "}
              Parent Task ID: {task.parentTaskId ? task.parentTaskId : "N/A"}
            </p>
            <button className="task-button" onClick={() => handleNavigate(task.id)}>Edit</button>
          </div>
          <span
            className="task-status"
            style={{
              color:
                task.status === "DONE" || task.status === "COMPLETE"
                  ? "green"
                  : "red",
            }}
          >
            {task.status}
          </span>
        </div>
      </div>
      <div className="deps-container">
        {task.dependencies?.map((dependency) => (
          <div className="task-item" key={dependency.id}>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={
                  dependency.status === "DONE" ||
                  dependency.status === "COMPLETE"
                }
                onChange={() => handleToggle(dependency)}
              />
              <span className="checkmark"></span>
            </label>
            <div className="task-box">
              <div className="task-info">
                <p className="task-name">{dependency.name}</p>
                <p className="task-id">ID : {dependency.id}</p>
                <button className="task-button" onClick={() => handleNavigate(dependency.id)}>Edit</button>
              </div>
              <span
                className="task-status"
                style={{
                  color:
                    dependency.status === "DONE" ||
                    dependency.status === "COMPLETE"
                      ? "green"
                      : "red",
                }}
              >
                {dependency.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskItem;
