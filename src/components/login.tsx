// src/components/Login.tsx
import React, { useState } from 'react';
import supabase from '../supabaseClient';
import bcrypt from 'bcryptjs';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Clear previous errors
    try {
      const { data, error } = await supabase
        .from('auth-creds')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        setError('User not found');
        return;
      }

      const isValid = await bcrypt.compare(password, data.pass_hash);
      if (isValid) {
        login(username);
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  const handleSignup = async () => {
    setError(null); // Clear previous errors

    // Check for empty fields (New code)
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const pass_hash = await bcrypt.hash(password, 10);

      const { error } = await supabase
        .from('auth-creds')
        .insert([{ username, pass_hash }]);

      if (error) {
        setError('Signup failed');
        return;
      }

      login(username);
      navigate('/');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div id="login-container">
      <div id="login-box">
        <h2 id="login-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
        {error && <p id="error-message">{error}</p>}
        <input
          id="login-username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="login-submit" onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button id="toggle-signup" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
