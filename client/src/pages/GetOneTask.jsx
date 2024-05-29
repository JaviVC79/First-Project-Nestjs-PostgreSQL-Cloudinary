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
        onClick={() => {
          navigate(`/updateTasks/${task.id}`);
        }}
      >
        Edit
      </button>
      <button
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
