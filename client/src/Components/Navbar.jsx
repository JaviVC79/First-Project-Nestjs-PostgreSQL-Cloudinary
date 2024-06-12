import { Link } from 'react-router-dom';
import { LogOut } from '../pages/LogOut';
import { UseAuth } from '../context/AuthContext';

function Navbar() {
  const { email } = UseAuth();
  if (email == undefined || email == '') {
    return (
      <div className="bg-zinc-200 flex justify-between px-10 py-2 rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        <h1>Tasks</h1>
        <ul className="flex inset-3 py-2">
          <li>
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="bg-zinc-200 flex justify-between px-10 py-2 rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        <h1>My tasks</h1>
        <LogOut />
        <ul className="flex inset-2 py-2">
          <li className="m-1">
            <Link
              to="/tasks"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              View my tasks
            </Link>
          </li>
          <li className="m-1">
            <Link
              to="/newTask"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create task
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
