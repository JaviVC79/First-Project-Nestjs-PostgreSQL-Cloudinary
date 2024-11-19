import { useEffect, useState } from "react";
import { getAllTasks, getImagesByUserEmail, getFullTasks } from '../api/task.api';
import { UseAuth } from '../context/AuthContext';


export const useGetTasks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { email, userTasks, getUserTasks } = UseAuth();
    const [completeTasksArray, setCompleteTasksArray] = useState([]);

    useEffect(() => {
        if (userTasks.length > 0) {
            setCompleteTasksArray(userTasks);
            setIsLoading(false);
            return;
        } else {
            (async () => {
                const allTasks = await getAllTasks(email);
                const allImages = await getImagesByUserEmail(email);
                const fullTasksArray = await getFullTasks(allTasks, allImages);
                setCompleteTasksArray(fullTasksArray);
                getUserTasks(fullTasksArray);
                setIsLoading(false);
            })()
        };
    }, [email]);

    return ({ isLoading, completeTasksArray })

}