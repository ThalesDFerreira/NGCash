import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import './styles/app.css';

function App() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
