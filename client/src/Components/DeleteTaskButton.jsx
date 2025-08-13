import { deleteTask } from '../api/task.api.js';
import { useNavigate } from 'react-router-dom';

const DeleteTaskButton = ({ email, task }) => {
    const navigate = useNavigate();

    return (
        <button
            className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            onClick={async () => {
                await deleteTask(email, task.name, task.id);
                navigate(0);
            }}
        >
            Delete
        </button>
    );
};

export default DeleteTaskButton;
