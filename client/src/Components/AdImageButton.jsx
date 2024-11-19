import { useNavigate } from 'react-router-dom';

const AdImageButton = ({task, isAddImageClicked, setIsAddImageClicked}) => {
    const navigate = useNavigate();
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded m-1 h-fit py-1 px-2"
            onClick={() => {
                setIsAddImageClicked(!isAddImageClicked);
            }}
        >
            Ad Image
        </button>
    )
}

export default AdImageButton;