import { useState } from "react";
import { updateTaskRequest } from '../api/task.api.js';


function useTaskCardState(task) {
    const [isClicked, setIsClicked] = useState(false);
    const [name, setName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.taskDescription);
    const [taskStatus, setTaskStatus] = useState(task.taskStatus);
    const TaskStatus = ['PENDING', 'IN_PROCESS', 'DONE'];

    const handleIsClick = () => {
        setIsClicked(!isClicked);
    };

    const handleSaveChanges = async () => {
        const values = {
            name: name,
            taskDescription: taskDescription,
            taskStatus: taskStatus
        };
        await updateTaskRequest(values, task.id);
        setIsClicked(!isClicked);
        window.location.reload();
    }

    return {
        isClicked,
        name,
        setName,
        taskDescription,
        setTaskDescription,
        taskStatus,
        TaskStatus,
        setTaskStatus,
        handleIsClick,
        handleSaveChanges
    };
}
export default useTaskCardState;

