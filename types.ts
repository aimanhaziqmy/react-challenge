export interface Task {
    id: string;
    name: string;
    status: "IN PROGRESS" | "DONE" | "COMPLETE";
    parentTaskId?: string;
    dependencies?: Task[];
}

export interface TaskWithDependencies extends Task {
    dependencies?: TaskWithDependencies[];
}

export interface EditTaskProps {
    task: Task;
}
