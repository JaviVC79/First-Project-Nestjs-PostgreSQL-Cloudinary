import { Link } from 'react-router-dom';
import { LogOut } from '../pages/LogOut';
import { UseAuth } from '../context/AuthContext';

function Navbar() {
  const { email } = UseAuth();

  // Estilos comunes para los enlaces de navegación
  const linkClasses = "text-center w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors whitespace-nowrap";
  const loginLinkClasses = "text-center w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors whitespace-nowrap";
  
  if (!email) {
    return (
      <nav className="bg-zinc-800 text-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Tasks</h1>
        <ul className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <li>
            <Link to="/" className={linkClasses}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/register" className={linkClasses}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className={loginLinkClasses}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="bg-zinc-800 text-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold">My tasks</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <ul className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <li>
              <Link to="/tasks" className={linkClasses}>
                View my tasks
              </Link>
            </li>
            <li>
              <Link to="/newTask" className={loginLinkClasses}>
                Create task
              </Link>
            </li>
          </ul>
          <div className="w-full sm:w-auto">
            <LogOut />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

