import { useNavigate } from 'react-router-dom';

const AdImageButton = ({ task, isAddImageClicked, setIsAddImageClicked }) => {
    const navigate = useNavigate();

    return (
        <button
            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            onClick={() => {
                setIsAddImageClicked(!isAddImageClicked);
            }}
        >
            {isAddImageClicked ? 'Cancel' : 'Add Image'}
        </button>
    );
};

export default AdImageButton;
