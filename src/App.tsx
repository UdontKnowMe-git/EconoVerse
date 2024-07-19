// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/chat';
import Login from './components/login';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';
import './App.css';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Chat />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
