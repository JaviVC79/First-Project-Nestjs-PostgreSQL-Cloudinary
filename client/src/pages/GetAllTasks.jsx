import { useState, useEffect } from 'react';
import { getAllTasks } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import TaskCard from '../Components/TaskCard.jsx';

function GetAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = UseAuth();
  
  useEffect(() => {
    (async () => {
      const allTasks = await getAllTasks(email);
      setTasks(allTasks);
      setIsLoading(false);
    })();
  }, [email]);

  if (email == undefined || email == '') {
    return <Navigate to={'/login'} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (Array.isArray(tasks) && tasks.length >= 1) {
    return tasks.map((task) => <TaskCard task={task} key={task.name} />);
  } else {
    return (
      <div>
        <h2 className='bg-red-500 text-white rounded-md px-2 py-1 m-4 text-center'>There are no tasks added yet</h2>
      </div>
    );
  }
}

export default GetAllTasks;
