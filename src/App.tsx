// src/App.tsx
import React from 'react';
import Login from './components/login';
import "./App.css"
import Chat from './components/chat';

const App: React.FC = () => {
  return (
    <div className="App">
      <Login />
      <Chat />
    </div>
  );
};

export default App;
