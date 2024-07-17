// src/components/Login.tsx
import React, { useState } from 'react';
import supabase from '../supabaseClient';
import bcrypt from 'bcryptjs';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('auth-creds')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('User not found');
      return;
    }

    const isValid = await bcrypt.compare(password, data.pass_hash);
    if (isValid) {
      console.log('Login successful');
      login(username);
    } else {
      console.error('Invalid credentials');
    }
  };

  const handleSignup = async () => {
    const pass_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('auth-creds')
      .insert([{ username, pass_hash }]);

    if (error) {
      console.error('Signup failed');
      return;
    }

    console.log('Signup successful');
    login(username);
  };

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isSignup ? handleSignup : handleLogin}>
        {isSignup ? 'Sign Up' : 'Login'}
      </button>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Login;
