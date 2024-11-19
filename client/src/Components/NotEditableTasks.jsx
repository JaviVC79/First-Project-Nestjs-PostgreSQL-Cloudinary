import DeleteTaskButton from './DeleteTaskButton';
import AdImageButton from "./AdImageButton.jsx";
import { UseAuth } from '../context/AuthContext';
import SendImageForm from '../pages/SendImageForm.jsx';

const NotEditableTasks = ({ task, handleIsClick, isAddImageClicked, setIsAddImageClicked }) => {
    const { email } = UseAuth();
    return (
        <div
            id={task.id}
            className="font-bold bg-slate-200 rounded-lg m-4 max-h-96"
        >
            <div className="grid ">
                <h3 className="text-3xl my-2 mx-8 text-clip overflow-hidden">
                    {task.name}
                </h3>
            </div>
            <div className="grid grid-cols-5 px-2 py-2 justify-items-center">
                {isAddImageClicked ? (
                    <SendImageForm task={task} />
                ) : (
                    task.image ? (
                        <img src={task.image} alt={task.name} className="p-2 rounded-xl" />
                    ) : (
                        <p className="p-2 text-base">No image available</p>
                    )
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
    )

}


export default NotEditableTasks;