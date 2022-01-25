//import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import 'bulma/css/bulma.css';
import './App.css';

type AppValues = {
  sessionToken: string | null
}

class App extends React.Component<{}, AppValues> {
  constructor(props: any) {
    super(props)
    this.state = {
      sessionToken: null
    }
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register sessionToken={this.state.sessionToken} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
