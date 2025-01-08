import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';
import { ToastContainer } from 'react-toastify';
import AdminPanel from './pages/AdminPanel';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      <ToastContainer theme='dark' />
    </Router>
  );
};

export default App;
