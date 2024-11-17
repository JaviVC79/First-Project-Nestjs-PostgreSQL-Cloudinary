import { useState } from "react";
import { updateTaskRequest, deleteTask } from '../api/task.api.js';
import ContentEditable from './ContentEditable';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';

function TaskCard({ task }) {
  const { email } = UseAuth();
  const navigate = useNavigate();
  const [isCliked, setIsCliked] = useState(false);
  const [name, setName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);
  const [taskStatus, setTaskStatus] = useState(task.taskStatus);
  const TaskStatus = ['PENDING', 'IN_PROCESS', 'DONE'];

  const handleIsClick = () => {
    setIsCliked(!isCliked);
  };

  const handleSaveChanges = async () => {
    const values = {
      name: name,
      taskDescription: taskDescription,
      taskStatus: taskStatus
    };
    await updateTaskRequest(values, task.id);
    setIsCliked(!isCliked);
    window.location.reload();
  };

  return (
    <>
      {isCliked ?
        <div
          id={task.id}
          className="font-bold bg-slate-200 rounded-lg m-4"
        >
          <div className="grid ">
            <button
              className="break-words text-3xl my-2 mx-8 text-clip overflow-hidden justify-items-start"
              onClick={handleIsClick}
            >
              <ContentEditable value={name} onChange={setName} className="text-3xl my-2 mx-8 text-clip overflow-hidden" />
            </button>
          </div>
          <div className="grid grid-cols-5 px-2 py-2 justify-items-center">
            {task.image && (
              <img src={task.image} alt={task.name} className="p-2 rounded-xl" />
            ) || (
                <p className="p-2 text-base">No image available</p>
              )}
            <ContentEditable value={taskDescription} onChange={setTaskDescription} className="p-2 text-base overflow-auto col-span-3 max-w-80" />
            <div className="grid grid-rows-2 max-w-8 max-h-72">
              <ul>
                <li>
                  <b>Status:</b>
                  <select
                    id="taskStatus"
                    name="taskStatus"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="block appearance-none w-fit bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option className="text-sm xs:text-xs" value={TaskStatus[0]}>{TaskStatus[0]}</option>
                    <option className="text-sm xs:text-xs" value={TaskStatus[1]}>{TaskStatus[1]}</option>
                    <option className="text-sm xs:text-xs" value={TaskStatus[2]}>{TaskStatus[2]}</option>
                  </select>
                </li>
                <li>
                  <p className="p-2 text-sm">
                    <b>Last update:</b> {task.taskUpdatedAt}
                  </p>
                </li>
              </ul>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded max-h-fit"
                onClick={handleSaveChanges}
              >Save changes</button>
            </div>
          </div>
        </div> :
        <div
          id={task.id}
          className="font-bold bg-slate-200 rounded-lg m-4 max-h-96"
        >
          <div className="grid ">
            <button
              className="break-words text-3xl my-2 mx-8 text-clip overflow-hidden justify-items-start"
              onClick={handleIsClick}
            >
              <h3 className="text-3xl my-2 mx-8 text-clip overflow-hidden">
                {task.name}
              </h3>
            </button>
          </div>
          <div className="grid grid-cols-5 px-2 py-2 justify-items-center">
            {task.image && (
              <img src={task.image} alt={task.name} className="p-2 rounded-xl" />
            ) || (
                <p className="p-2 text-base">No image available</p>
              )}
            <p className="p-2 text-base overflow-auto col-span-3 max-w-80 max-h-64 break-words whitespace-normal">
              {task.taskDescription}
            </p>
            <div className="grid grid-rows-2 justify-items-end max-w-8">
              <ul>
                <li>
                  <p className="p-2 text-base">
                    <b>Status:</b> {task.taskStatus}
                  </p>
                </li>
                <li>
                  <p className="p-2 text-sm">
                    <b>Last update:</b> {task.taskUpdatedAt}
                  </p>
                </li>
              </ul>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded m-1 h-fit py-1 px-2"
                  onClick={() => {
                    navigate(`/sendImage/${task.id}`);
                  }}
                >
                  Ad Image
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold rounded m-1 h-fit py-1 px-2"
                  onClick={async () => {
                    await deleteTask(email, task.name, task.id);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}

export default TaskCard;



