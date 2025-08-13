import DeleteTaskButton from './DeleteTaskButton';
import AdImageButton from "./AdImageButton.jsx";
import { UseAuth } from '../context/AuthContext';
import SendImageForm from '../pages/SendImageForm.jsx';

const NotEditableTasks = ({ task, handleIsClick, isAddImageClicked, setIsAddImageClicked }) => {
    const { email } = UseAuth();
    
    return (
        <div id={task.id}>
            {/* Sección del Título */}
            <div className="w-full mb-4">
                <h3 className="text-3xl font-bold break-words text-clip overflow-hidden">
                    {task.name}
                </h3>
            </div>
            
            {/* Contenedor principal para la imagen, descripción y controles */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sección de la Imagen/Formulario */}
                <div className="w-full md:w-1/4 flex-shrink-0">
                    {isAddImageClicked ? (
                        <SendImageForm task={task} />
                    ) : (
                        task.image ? (
                            <img
                                src={task.image}
                                alt={task.name}
                                className="w-full h-auto rounded-xl object-cover"
                            />
                        ) : (
                            <p className="p-2 text-base text-gray-400">No image available</p>
                        )
                    )}
                </div>

                {/* Sección de Descripción y Controles */}
                <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-4">
                    {/* Sección de la Descripción */}
                    <div className="w-full md:w-2/3">
                        <p className="w-full h-full p-2 text-base overflow-auto border-2 border-transparent rounded-lg break-words whitespace-normal">
                            {task.taskDescription}
                        </p>
                    </div>

                    {/* Sección de Controles y Detalles */}
                    <div className="w-full md:w-1/3 flex flex-col justify-between">
                        <ul className="space-y-2">
                            <li>
                                <p className="text-base">
                                    <b>Status:</b> {task.taskStatus}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm">
                                    <b>Last update:</b> <br /> {task.taskUpdatedAt}
                                </p>
                            </li>
                        </ul>
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2 mt-4">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                onClick={handleIsClick}
                            >
                                Edit
                            </button>
                            <AdImageButton task={task} isAddImageClicked={isAddImageClicked} setIsAddImageClicked={setIsAddImageClicked} />
                            <DeleteTaskButton email={email} task={task} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotEditableTasks;
