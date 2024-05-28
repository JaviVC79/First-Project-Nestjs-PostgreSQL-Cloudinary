import { Link } from 'react-router-dom';
import { LogOut } from '../pages/LogOut';
import { UseAuth } from '../context/AuthContext';

function Navbar() {
  const { email } = UseAuth();
  console.log(`navbae ${email}`);
  if (email == undefined || email == '') {
    return (
      <div>
        <h1>Tasks</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>My tasks</h1>
        <LogOut />
        <ul>
          <li>
            <Link to="/tasks">View my tasks</Link>
          </li>
          <li>
            <Link to="/newTask">Create task</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
