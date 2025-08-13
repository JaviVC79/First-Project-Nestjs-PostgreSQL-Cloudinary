import useTaskCardState from "../hooks/useTaskCardState.js";
import NotEditableTasks from "./NotEditableTasks.jsx";
import EditableTasks from "./EditableTasks.jsx";
import { useState } from 'react'; 

function TaskCard({ task }) {
  const [isAddImageClicked, setIsAddImageClicked] = useState(false);
  const {
    handleIsClick,
    isClicked,
  } = useTaskCardState(task);

  return (
    // Contenedor principal de la tarjeta, con estilos responsive
    <div className="bg-gray-400 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 min-w-[300px] max-w-sm w-full">
      {isClicked ?
        <EditableTasks task={task} handleIsClick={handleIsClick} /> :
        <NotEditableTasks task={task} handleIsClick={handleIsClick} isAddImageClicked={isAddImageClicked} setIsAddImageClicked={setIsAddImageClicked} />}
    </div>
  );
}

export default TaskCard;





