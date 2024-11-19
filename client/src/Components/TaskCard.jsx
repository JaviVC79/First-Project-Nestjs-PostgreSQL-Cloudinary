import useTaskCardState from "../hooks/useTaskCardState.js";
import NotEditableTasks from "./NotEditableTasks.jsx";
import EditableTasks from "./EditableTasks.jsx";
import { useState } from 'react'; 

function TaskCard({ task }) {
  const [isAddImageClicked, setIsAddImageClicked] = useState(false)
  const {
    handleIsClick,
    isClicked,
  } = useTaskCardState(task);

  return (
    <>
      {isClicked ?
        <EditableTasks task={task} handleIsClick={handleIsClick} /> :
        <NotEditableTasks task={task} handleIsClick={handleIsClick} isAddImageClicked={isAddImageClicked} setIsAddImageClicked={setIsAddImageClicked} />}
    </>
  );
}

export default TaskCard;



