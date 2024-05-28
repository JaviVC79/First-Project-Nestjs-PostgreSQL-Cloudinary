import { useState, useEffect } from 'react';
import { getAllTasks } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function GetAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = UseAuth();
  console.log(`getalltasks email ${email}`);
  useEffect(() => {
    (async () => {
      const allTasks = await getAllTasks(email);
      setTasks(allTasks);
      setIsLoading(false);
    })();
  }, [email]);
  if (email == undefined || email == '') {
    <Navigate to={'/login'} />;
  }
  if (!isLoading) {
    if (email != undefined) {
      console.log(`numero tasks: ${tasks.length}`);
      console.log(`tasks: ${tasks?.name}`);
      if (tasks?.length >= 1) {
        return tasks.map((task) => (
          <div key={task.name}>
            <a href={`http://localhost:5173/task?name=${task.name}`}>
              <h3>{task.name}</h3>
            </a>
            <ul>
              <li>
                <p>
                  <b>Description:</b> {task.taskDescription}
                </p>
              </li>
              <li>
                <p>
                  <b>Status:</b> {task.taskStatus}
                </p>
              </li>
              <li>
                <p>
                  <b>Last update:</b> {task.taskUpdatedAt}
                </p>
              </li>
            </ul>
          </div>
        ));
      }
    }
  } else {
    return (
      <div>
        <h2>there are no tasks added yet</h2>
      </div>
    );
  }
}

export default GetAllTasks;
