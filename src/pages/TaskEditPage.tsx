import { useEffect, useState } from "react";
import "./taskeditpage.css";
import { useParams, useNavigate } from "react-router";
import { fetchTaskById } from "../services/api";
import { Task } from "../../types";
import { useTasks } from "../hooks/useTasks";

function TaskEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTaskName } = useTasks();

  const [task, setTask] = useState<Task | null>(null);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await fetchTaskById(id!);
        if (fetchedTask) {
          setTask(fetchedTask);
          setNewName(fetchedTask.name);
        } else {
          navigate("/notfound");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSave = async () => {
    if (task && newName !== task.name) {
      try {
        await updateTaskName({ ...task, name: newName });
        console.log({ ...task, name: newName })
        navigate("/");
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Something went wrong, cannot save");
      }
    } else {
      navigate("/");
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <main className="main-content">
        <div className="task-edit-page">
          <h1>Edit Task</h1>
          
          <div className="task-form">
            <small>Task ID: {id}</small>
            <div className="form-group">
              <label htmlFor="task-name">Task Name</label>
              <input
                id="task-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter task name"
              />
            </div>
            <button className="submit-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskEditPage;