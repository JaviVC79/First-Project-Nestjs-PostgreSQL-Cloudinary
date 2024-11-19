import { UseAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import TaskCard from '../Components/TaskCard.jsx';
import { useGetTasks } from '../hooks/useGetTasks.js';



function GetAllTasks() {
  const { isLoading, completeTasksArray } = useGetTasks();
  const { email } = UseAuth();
 
  if (email == undefined || email == '') {
    return <Navigate to={'/login'} />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <div className="text-blue-500 text-lg font-semibold">Loading...</div>
        </div>
      </div>
    );
  }


  if (Array.isArray(completeTasksArray) && completeTasksArray.length >= 1) {
    return completeTasksArray.map((task) => <TaskCard task={task} key={task.name} />);
  } else {
    return (
      <div>
        <h2 className='bg-red-500 text-white rounded-md px-2 py-1 m-4 text-center'>There are no tasks added yet</h2>
      </div>
    );
  }
}

export default GetAllTasks;
