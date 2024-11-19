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
        handleSaveChanges } = useTaskCardState(task);

    return (
        <div
            id={task.id}
            className="font-bold bg-slate-200 rounded-lg m-4"
        >
            <div className="grid ">
                <h2
                    className="break-words text-3xl my-2 mx-8 text-clip overflow-hidden justify-items-start"
                >
                    <ContentEditable value={name} onChange={setName} className="text-3xl my-2 mx-8 text-clip overflow-hidden border-solid border-2 border-black" />
                </h2>
            </div>
            <div className="grid grid-cols-5 px-2 py-2 justify-items-center">
                {task.image && (
                    <img src={task.image} alt={task.name} className="p-2 rounded-xl" />
                ) || (
                        <p className="p-2 text-base">No image available</p>
                    )}
                <ContentEditable value={taskDescription} onChange={setTaskDescription} className="p-2 text-base overflow-auto col-span-3 max-w-80 border-solid border-2 border-black" />
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
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded m-1 h-fit py-1 px-2"
                            onClick={handleIsClick}
                        >
                            Edit
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded max-h-fit"
                            onClick={handleSaveChanges}
                        >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditableTasks;