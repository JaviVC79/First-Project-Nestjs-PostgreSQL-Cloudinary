import { useState, useEffect } from 'react';
import { getOneTask } from '../api/task.api.js';

function GetOneTask() {
    const [task, setTask] = useState({});
    useEffect(() => {
      const fetchTask = async () => {
        setTask(await getOneTask());
      };
      fetchTask();
    }, []);
    return (
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
    );
}
export default GetOneTask