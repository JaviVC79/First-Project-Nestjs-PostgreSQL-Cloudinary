import { Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import TaskPage from './pages/TaskPage';
import TaskForm from './pages/TaskForm';
import NotFound from './pages/NotFound';
import Navbar from './Components/Navbar';
import { AuthProvider } from './context/AuthContext';
import GetAllTasks from './pages/GetAllTasks';
import GetOneTask from './pages/GetOneTask';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/tasks" element={<GetAllTasks />} />
          <Route path="/task" element={<GetOneTask />} />
          <Route path="/newTask" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
