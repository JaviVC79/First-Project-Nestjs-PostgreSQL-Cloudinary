import Navbar from './Components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './pages/routes/AppRoutes';

function App() {
  return (
    <div className="bg-zinc-700 h-screen">
      <div className="container mx-auto py-4">
        <AuthProvider>
          <Navbar />
          <AppRoutes />
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
