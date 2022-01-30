import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Search from './components/search/Search';
import './App.css';

type AppValues = {
  sessionToken: string | null,
  auth: boolean,
  server: string | null,
  summonerName: string | null,
  verified: boolean,
  patch: string | null
}

class App extends React.Component<{}, AppValues> {
  constructor(props: {}) {
    super(props)
    this.state = {
      sessionToken: null,
      auth: false,
      server: null,
      summonerName: null,
      verified: false,
      patch: null
    }
  }

  updateToken = (token: string): void => {
    this.setState({ sessionToken: token })
    localStorage.setItem('Authorization', token);
  }

  auth = (): boolean => localStorage.getItem('Authorization') !== null && this.state.sessionToken !== null && this.state.sessionToken === localStorage.getItem('Authorization')

  getPatch = async (): Promise<void> => {
    await fetch('https://ddragon.leagueoflegends.com/realms/na.json', {
      method: 'GET',
      mode: 'cors'
    })
      .then(result => result.json())
      .then(result => this.setState({ patch: result.v }))
    console.log(this.state.patch)
  }

  checkToken = async (): Promise<void> => {
    if (localStorage.getItem('Authorization') !== undefined && this.state.sessionToken === null) {
      await fetch(`${APIURL}/account/checkToken`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        }),
      })
        .then(result => {
          if (result.status === 200)
            this.setState({ sessionToken: localStorage.getItem('Authorization') })
          return result.json()
        })

      if (this.state.sessionToken !== null) {
        await fetch(`${APIURL}/profile/summonerInfo`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
          }),
        }).then(result => result.json())
          .then(result => {
            if (result.verified)
              this.setState({ verified: true, server: result.server, summonerName: result.summonerName })
          })
      }

    }
  }

  componentDidMount = () => {
    this.checkToken()
    this.getPatch()
  }

  render() {
    return (
      <>
        <Router>
          <Nav auth={this.auth} />
          <Routes>
            <Route path='/register' element={<Register sessionToken={this.state.sessionToken} updateToken={this.updateToken} />} />
            <Route path='/login' element={<Login sessionToken={this.state.sessionToken} updateToken={this.updateToken} />} />
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search patch={this.state.patch} sessionToken={this.state.sessionToken} auth={this.auth} />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
