import { Link } from 'react-router-dom';
import { LogOut } from '../pages/LogOut';
import { UseAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
  const { email } = UseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estilos comunes para los enlaces de navegación
  const linkClasses = "text-center w-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded transition-colors whitespace-nowrap";
  const loginLinkClasses = "text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors whitespace-nowrap";
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  if (!email) {
    return (
      <nav className="bg-zinc-800 text-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-xl font-bold">Tasks</h1>
          {/* Botón de hamburguesa visible solo en pantallas pequeñas */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none focus:text-gray-400"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Enlaces de navegación que se ocultan en móviles por defecto */}
        <ul className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0`}>
          <li>
            <Link to="/" className={linkClasses} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/register" className={linkClasses} onClick={toggleMenu}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className={loginLinkClasses} onClick={toggleMenu}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="bg-zinc-800 text-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-xl font-bold">My tasks</h1>
          {/* Botón de hamburguesa visible solo en pantallas pequeñas */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none focus:text-gray-400"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0`}>
          <ul className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <li>
              <Link to="/tasks" className={linkClasses} onClick={toggleMenu}>
                View my tasks
              </Link>
            </li>
            <li>
              <Link to="/newTask" className={loginLinkClasses} onClick={toggleMenu}>
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


