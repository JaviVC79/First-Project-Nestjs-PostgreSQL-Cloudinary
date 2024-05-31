import { UseAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';



export const LogOut = () => {
  const { logOut } = UseAuth();
  const history = useNavigate();
  return (
    <div className=''>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{  history('/');
    logOut()
  }} >Log Out</button>
    </div>
  )
}