import React from "react";
import { Task } from "../../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onStatusChange: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} />
            ))}
        </ul>
    );
} 

export default TaskList