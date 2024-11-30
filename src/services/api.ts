import axios from "axios";
import { Task, TaskWithDependencies } from "../../types";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://host.docker.internal:3000";

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get(`${API_URL}/tasks`);
  return data;
};

export const fetchTasksByParentGroup = async (): Promise<
  TaskWithDependencies[]
> => {
  const response = await axios.get(`${API_URL}/tasks`);
  const tasks: Task[] = Array.isArray(response.data)
    ? response.data
    : response.data.tasks || [];

  if (tasks.length === 0) {
    console.warn("No tasks received from the API");
    return [];
  }

  const taskMap: { [key: string]: TaskWithDependencies } = {};

  // Create all tasks in the map
  tasks.forEach((task) => {
    taskMap[task.id] = { ...task, dependencies: [] };
  });

  // Organize tasks into parent and child relationships
  tasks.forEach((task) => {
    if (task.parentTaskId && taskMap[task.parentTaskId]) {
      // This is a child task, add it to its parent's dependencies
      taskMap[task.parentTaskId].dependencies?.push(taskMap[task.id]);
    }
  });

  // filter out tasks that have a parent (as they're now in their parent's dependencies)
  const groupedTasks = Object.values(taskMap).filter(
    (task) => !task.parentTaskId
  );

  return groupedTasks;
};

// Fetch data by Task ID only
export const fetchTaskById = async (id: string): Promise<Task | null> => {
  try {
    const { data } = await axios.get(`${API_URL}/tasks/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const { data } = await axios.post(`${API_URL}/tasks`, task);
  return data;
};


export const updateTask = async (task: Task): Promise<Task> => {
  const { data } = await axios.put(`${API_URL}/tasks/${task.id}`, task);
  return data;
};
