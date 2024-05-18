import { useState, useEffect } from 'react';
import { getAllTasks } from '../api/task.api.js';

function GetAllTasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(await getAllTasks());
    };
    fetchTasks();
  }, []);
  //console.log(tasks);
  return tasks.map((task) => (
    <div key={task.name}>
      <h3>{task.name}</h3>
      <ul>
        <li>
          <p>{task.taskDescription}</p>
        </li>
        <li>
          <p>{task.taskStatus}</p>
        </li>
        <li>
          <p>{task.taskUpdatedAt}</p>
        </li>
      </ul>
    </div>
  ));
}
export default GetAllTasks;
