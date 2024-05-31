function TaskCard({ task }) {
  return (
    <div
      id={task.id}
      className="grid grid-cols-3 px-2 py-2 font-bold bg-slate-200 rounded-lg m-4"
    >
      <a href={`http://localhost:5173/task?name=${task.name}`}>
        <h3 className="text-3xl">{task.name}</h3>
      </a>
      <p>
        <b>Description:</b> {task.taskDescription}
      </p>
      <ul>
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
  );
}
export default TaskCard;
