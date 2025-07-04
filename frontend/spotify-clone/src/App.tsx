import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';

function App() {
  return (
    <>
      <header>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth-callback" element={<AuthCallbackPage/>} />
        <Route path="/signup" element={<h1>Signup Page</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
      </Routes>
      
    </header>
    </>
  );
}

export default App;
