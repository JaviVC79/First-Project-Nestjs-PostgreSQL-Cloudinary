import { deleteTask } from '../api/task.api.js';
import { useNavigate } from 'react-router-dom'

const DeleteTaskButton = ({ email, task }) => {
    const navigate = useNavigate();
    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded m-1 h-fit py-1 px-2"
            onClick={async () => {
                await deleteTask(email, task.name, task.id);
                navigate(0);
            }}
        >
            Delete
        </button>
    )
}




export default DeleteTaskButton;
