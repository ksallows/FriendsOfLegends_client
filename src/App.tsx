import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Login';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Router>
    </>
  );
}

export default App;
