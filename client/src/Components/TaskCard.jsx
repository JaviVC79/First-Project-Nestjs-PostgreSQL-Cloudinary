function TaskCard({ task, taskImage }) {
  return (
    <div
      id={task.id}
      className="font-bold bg-slate-200 rounded-lg m-4"
    >
      <div className="grid ">
        <a
          className="break-words text-3xl my-2 mx-8 text-clip overflow-hidden"
          href={`http://localhost:5173/task?name=${task.name}`}
        >
          <h3 className="text-3xl my-2 mx-8 text-clip overflow-hidden">
            {task.name}
          </h3>
        </a>
      </div>
      <div className="grid grid-cols-3 px-2 py-2 ">
        {taskImage && (
          <img src={taskImage} alt={task.name} className="p-2 rounded-xl" />
        )}
        <p className="p-2 break-words text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-clip overflow-hidden">
          <b>Description:</b> {task.taskDescription}
        </p>
        <ul>
          <li>
            <p className="p-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              <b>Status:</b> {task.taskStatus}
            </p>
          </li>
          <li>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              <b>Last update:</b> {task.taskUpdatedAt}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default TaskCard;
