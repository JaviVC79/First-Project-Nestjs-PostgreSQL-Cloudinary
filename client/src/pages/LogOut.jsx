import { UseAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';



export const LogOut = () => {
  const { logOut } = UseAuth();
  const history = useNavigate();
  return (
    <div>
      <button onClick={()=>{  history('/');
    logOut()
  }} >Log Out</button>
    </div>
  )
}