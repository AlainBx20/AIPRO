import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';
import { auth, googleProvider, githubProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../styles/Login.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        // Store additional user data if needed
        // For example, you might want to store the user's email in your database
        
        // Navigate to loading page
        navigate('/loading');
      }
    } catch (error: any) {
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email is already in use');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
    }
  };

  const handleBackToLogin = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
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
                key="register-form"
                className="login-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h2>Sign up</h2>
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
                    minLength={6}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    minLength={6}
                  />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submit-button">
                  Register
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
                <div className="login-link">
                  Already have an account?{' '}
                  <motion.button
                    type="button"
                    onClick={handleBackToLogin}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign in
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