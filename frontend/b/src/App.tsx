import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route
            path="/dashboard"
            element={

                <Dashboard />

            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;