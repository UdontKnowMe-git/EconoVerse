// src/App.tsx
import React from 'react';
import "./App.css"
import Chat from './components/chat';

const App: React.FC = () => {
  return (
    <div className="App">
      <Chat />
    </div>
  );
};

export default App;
