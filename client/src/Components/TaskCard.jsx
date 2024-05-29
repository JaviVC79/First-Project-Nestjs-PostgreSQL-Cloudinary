function TaskCard({task}) {
  return (
    <div id={task.id}>
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
  )
}
export default TaskCard