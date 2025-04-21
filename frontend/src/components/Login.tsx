import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import '../styles/Login.css';

interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email });
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok) {
        // Store the token and email
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        // Navigate to loading page instead of dashboard
        navigate('/loading');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/register');
    }, 500);
  };

  return (
    <>
      <ParticlesBackground />
      <div className="login-wrapper">
        <div className="login-container">
          <AnimatePresence mode="wait">
            {!isExiting && (
              <motion.form
                key="login-form"
                className="login-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h2>Sign in</h2>
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={isLoading}
                  />
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
                {error && <p className="error">{error}</p>}
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className="divider">
                  <span>or continue with</span>
                </div>
                <div className="social-login">
                  <button
                    type="button"
                    className="social-button google"
                    onClick={() => setError('Google login coming soon')}
                    disabled={isLoading}
                  >
                    <FaGoogle /> Google
                  </button>
                  <button
                    type="button"
                    className="social-button github"
                    onClick={() => setError('GitHub login coming soon')}
                    disabled={isLoading}
                  >
                    <FaGithub /> GitHub
                  </button>
                </div>
                <div className="register-link">
                  Don't have an account?{' '}
                  <motion.button
                    type="button"
                    onClick={handleRegister}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    Register
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Login;