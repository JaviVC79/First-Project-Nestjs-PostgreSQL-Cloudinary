import {Route, Routes} from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import TaskForm from './pages/TaskForm'
import NotFound from './pages/NotFound'
import Navbar from './Components/Navbar'

function App() {
  return (
    <>
    <Navbar/>
        <Routes>
            <Route path="/" element={<TaskPage/>} />
            <Route path="/newTask" element={<TaskForm/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </>
  )
}

export default App
