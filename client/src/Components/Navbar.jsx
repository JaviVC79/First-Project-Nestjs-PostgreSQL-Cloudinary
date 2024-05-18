import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>

        <h1>Tasks</h1>

        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/newTask">Create task</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar