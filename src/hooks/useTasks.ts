import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchTasks, fetchTasksByParentGroup, createTask, updateTask } from "../services/api";
import { Task } from "../../types";

export const useTasks = () => {
    const queryClient = useQueryClient();

    const tasksQuery = useQuery("tasks", fetchTasksByParentGroup);

    const validateTaskCreation = async (data: Omit<Task, "id">) => {
        createTaskMutation.mutate(data);
    };

    const createTaskMutation = useMutation(createTask, {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks");
        },
    });

    // For temporary update the task status
    function tempUpdateTaskStatus(tasks: Task[], idToUpdate: string, newStatus: string): Task[] {
        return tasks.map(task => 
          task.id === idToUpdate 
            ? { ...task, status: newStatus as Task['status'] } 
            : task
        );
      }
      

    const validateTaskUpdate = async (data: Task) => {
        
        const checkDependencies = await fetchTasks();
        // IF the parent task is DONE or COMPLETE update all the dependencies
        // Check if all dependencies are DONE, convert to COMPLETE with its parent
        if(data.status === "DONE" || data.status === "COMPLETE"){
            const dependenciesDoneOrComplete = checkDependencies.filter(task => task.parentTaskId === data.id);

            // update all its dependencies to COMPLETE
            if(dependenciesDoneOrComplete.length > 0){
                dependenciesDoneOrComplete.forEach(dependency => {
                    dependency.status = "COMPLETE";
                    updateTaskMutation.mutate(dependency);
                });
            }
            
            // IF dont have any parentTaskId, change the status to COMPLETE
            if(!data.parentTaskId){
                data.status = "COMPLETE";
            }

            // IF this is a child task, check all the depedencies if it is done or not. 
            // Compare total num depedencies with num depedencies done, if all done change all the depedencies and its parent to COMPLETE
            if(data.parentTaskId){

                const tempUpdatedTasks = tempUpdateTaskStatus(checkDependencies, data.id, "DONE");
                const totalTaskWithSameParent = tempUpdatedTasks.filter(task => task.parentTaskId === data.parentTaskId);
                const totalTaskWithSameParentDone = tempUpdatedTasks.filter(task => task.parentTaskId === data.parentTaskId && (task.status === "COMPLETE" || task.status === "DONE"));

                if(totalTaskWithSameParent.length === (totalTaskWithSameParentDone.length)){
                    totalTaskWithSameParent.forEach(task => {
                        task.status = "COMPLETE";
                        updateTaskMutation.mutate(task);
                    });
                    // Update the parent task to COMPLETE
                    const parentTask = checkDependencies.filter(task => task.id === data.parentTaskId);
                    parentTask[0].status = "COMPLETE";
                    updateTaskMutation.mutate(parentTask[0]);

                    // all deps and parent to COMPLETE then return.
                    return;
                }
               
            }
        }

        // IF any dependencies is reverted to "IN PROGRESS", change the parentTaskId to "DONE"
        if(data.status === "IN PROGRESS"){
            let dependenciesInProgress = checkDependencies.filter(task => task.id === data.parentTaskId && task.id !== data.id);
            if(dependenciesInProgress.length > 0){
                dependenciesInProgress.forEach(dependency => {
                    dependency.status = "DONE";
                    updateTaskMutation.mutate(dependency);
                });
            }
        }

        console.log(data)
        updateTaskMutation.mutate(data);
    };

    const updateTaskMutation = useMutation(updateTask, {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks");
        },
    });

    return {
        tasks: tasksQuery.data || [],
        isLoading: tasksQuery.isLoading,
        createTask: validateTaskCreation,
        updateTask: validateTaskUpdate,
        updateTaskName: updateTaskMutation.mutate
    }
}

