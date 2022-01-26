import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import './App.css';

type AppValues = {
  sessionToken: string | null,
  auth: boolean
}

class App extends React.Component<{}, AppValues> {
  constructor(props: any) {
    super(props)
    this.state = {
      sessionToken: null,
      auth: false
    }
  }

  updateToken = (token: string): void => {
    this.setState({ sessionToken: token })
    localStorage.setItem('Authorization', token);
  }

  auth = (): boolean => localStorage.getItem('Authorization') !== null && this.state.sessionToken !== null && this.state.sessionToken === localStorage.getItem('Authorization')

  // if storage has a token but state doesn't, check if token is valid and if it is put it in state
  checkToken = async (): Promise<any> => {
    if (localStorage.getItem('Authorization') !== undefined && this.state.sessionToken === null) {
      await fetch(`${APIURL}/account/checkToken`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        }),
      })
        .then(result => {
          if (result.status === 200)
            this.setState({ sessionToken: localStorage.getItem('Authorization') })
        })
    }
    console.log(`sessionToken: ${this.state.sessionToken}`)
    console.log(`storage: ${localStorage.getItem('Authorization')}`)
  }

  componentDidMount = () => {
    setTimeout(this.checkToken, 500)
    console.log('component updated!')
  }

  render() {
    return (
      <>
        <Router>
          <Nav auth={this.auth} />
          <Routes>
            <Route path="/register" element={<Register sessionToken={this.state.sessionToken} updateToken={this.updateToken} />} />
            <Route path="/login" element={<Login sessionToken={this.state.sessionToken} updateToken={this.updateToken} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
