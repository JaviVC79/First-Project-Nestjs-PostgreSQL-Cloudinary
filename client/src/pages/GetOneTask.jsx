import { useState, useEffect } from 'react';
import { getOneTask } from '../api/task.api.js';
import TaskCard from '../Components/TaskCard.jsx';
import { deleteTask } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function GetOneTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const { email } = UseAuth();
  useEffect(() => {
    const fetchTask = async () => {
      setTask(await getOneTask());
    };
    fetchTask();
  }, []);

  return (
    <div>
      <TaskCard task={task} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={() => {
          navigate(`/updateTasks/${task.id}`);
        }}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={async () => {
          await deleteTask(email, task.name);
          navigate('/tasks');
        }}
      >
        Delete
      </button>
    </div>
  );
}
export default GetOneTask;
