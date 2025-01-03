import { useState, useEffect } from 'react';
import { getOneTask, getImage } from '../api/task.api.js';
import TaskCard from '../Components/TaskCard.jsx';
import { deleteTask } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function GetOneTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [id, setId] = useState('');
  const [taskImage, setTaskImage] = useState('');
  const { email } = UseAuth();
  useEffect(() => {
    const fetchTask = async () => {
      setTask(await getOneTask());
      setId(task?.id);
    };
    fetchTask();
  }, [id, task?.id]);
  useEffect(() => {
    const fetchImage = async () => setTaskImage(await getImage(id));
    fetchImage();
  }, [id]);
  return (
    <div>
      <TaskCard task={task} taskImage={taskImage} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={() => {
          navigate(`/updateTasks/${task.id}`);
        }}
      >
        Edit
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={() => {
          navigate(`/sendImage/${task.id}`);
        }}
      >
        Ad Image
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={async () => {
          await deleteTask(email, task.name, task.id);
          navigate('/tasks');
        }}
      >
        Delete
      </button>
    </div>
  );
}
export default GetOneTask;
