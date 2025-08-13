import useTaskCardState from "../hooks/useTaskCardState.js";
import ContentEditable from './ContentEditable';

const EditableTasks = ({ task, handleIsClick }) => {
    const {
        name,
        setName,
        taskDescription,
        setTaskDescription,
        taskStatus,
        TaskStatus,
        setTaskStatus,
        handleSaveChanges
    } = useTaskCardState(task);

    return (
        <div
            id={task.id}
            // Elimina clases de estilo aquí, ya se manejan en el componente padre
        >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Sección del Título */}
                <div className="w-full">
                    <h2 className="text-3xl font-bold mb-2">
                        <ContentEditable
                            value={name}
                            onChange={setName}
                            className="w-full p-2 border-2 border-black rounded-lg text-clip overflow-hidden"
                        />
                    </h2>
                </div>
            </div>

            {/* Contenedor principal para la imagen, descripción y controles */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                {/* Sección de la Imagen */}
                <div className="w-full md:w-1/4 flex-shrink-0">
                    {task.image ? (
                        <img
                            src={task.image}
                            alt={task.name}
                            className="w-full h-auto rounded-xl object-cover"
                        />
                    ) : (
                        <p className="p-2 text-base text-gray-400">No image available</p>
                    )}
                </div>

                {/* Sección de Descripción y Controles */}
                <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-4">
                    {/* Sección de la Descripción */}
                    <div className="w-full md:w-2/3">
                        <ContentEditable
                            value={taskDescription}
                            onChange={setTaskDescription}
                            className="w-full h-full p-2 text-base overflow-auto border-2 border-black rounded-lg"
                        />
                    </div>

                    {/* Sección de Controles y Detalles */}
                    <div className="w-full md:w-1/3 flex flex-col justify-between">
                        <ul className="space-y-2">
                            <li>
                                <b className="block">Status:</b>
                                <select
                                    id="taskStatus"
                                    name="taskStatus"
                                    value={taskStatus}
                                    onChange={(e) => setTaskStatus(e.target.value)}
                                    className="block w-full mt-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={TaskStatus[0]}>{TaskStatus[0]}</option>
                                    <option value={TaskStatus[1]}>{TaskStatus[1]}</option>
                                    <option value={TaskStatus[2]}>{TaskStatus[2]}</option>
                                </select>
                            </li>
                            <li>
                                <p className="text-sm">
                                    <b>Last update:</b> <br /> {task.taskUpdatedAt}
                                </p>
                            </li>
                        </ul>
                        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                            <button
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                onClick={handleSaveChanges}
                            >
                                Save
                            </button>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                onClick={handleIsClick}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditableTasks;
