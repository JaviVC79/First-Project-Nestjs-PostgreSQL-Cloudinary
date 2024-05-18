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
  return tasks.map((task) => (
    <div key={task.name}>
      <a href={`http://localhost:5173/task?name=${task.name}`}>
        <h3>{task.name}</h3>
      </a>
      <ul>
        <li>
          <p><b>Description:</b> {task.taskDescription}</p>
        </li>
        <li>
          <p><b>Status:</b> {task.taskStatus}</p>
        </li>
        <li>
          <p><b>Last update:</b> {task.taskUpdatedAt}</p>
        </li>
      </ul>
    </div>
  ));
}
export default GetAllTasks;