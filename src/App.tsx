import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bulma/css/bulma.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Link to='/register'>Register</Link>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
