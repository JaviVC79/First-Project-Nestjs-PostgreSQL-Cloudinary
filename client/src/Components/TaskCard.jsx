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
    // Se eliminaron las clases de ancho y se ajustaron los estilos
    <div className="bg-gray-400 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
      {isClicked ?
        <EditableTasks task={task} handleIsClick={handleIsClick} /> :
        <NotEditableTasks task={task} handleIsClick={handleIsClick} isAddImageClicked={isAddImageClicked} setIsAddImageClicked={setIsAddImageClicked} />}
    </div>
  );
}

export default TaskCard;





