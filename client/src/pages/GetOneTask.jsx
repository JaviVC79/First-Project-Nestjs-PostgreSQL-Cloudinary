import { useState, useEffect } from 'react';
import { getOneTask } from '../api/task.api.js';
import TaskCard from '../Components/TaskCard.jsx';

function GetOneTask() {
  const [task, setTask] = useState({});
  useEffect(() => {
    const fetchTask = async () => {
      setTask(await getOneTask());
    };
    fetchTask();
  }, []);
  return (
    <div>
      <TaskCard task={task} />
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
export default GetOneTask;
