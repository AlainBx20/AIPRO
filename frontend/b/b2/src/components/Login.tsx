import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { auth, googleProvider, githubProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        navigate('/loading');
      }
    } catch (error) {
      setError('Social login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        // Store the Firebase ID token in localStorage
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('token', token);
        navigate('/loading', { replace: true });
      }
    } catch (error: any) {
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Login failed. Please try again.');
      }
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
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submit-button">
                  Login
                </button>
                <div className="divider">
                  <span>or continue with</span>
                </div>
                <div className="social-login">
                  <button
                    type="button"
                    className="social-button google"
                    onClick={() => handleSocialLogin(googleProvider)}
                  >
                    <FaGoogle /> Google
                  </button>
                  <button
                    type="button"
                    className="social-button github"
                    onClick={() => handleSocialLogin(githubProvider)}
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
}