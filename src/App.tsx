import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Search from './components/search/Search';
import EditProfile from './components/profile/EditProfile';
import './App.css';

interface AppValues {
  sessionToken: string | null,
  auth: boolean,
  server: string | null,
  summonerName: string | null,
  verified: boolean,
  patch: string | null,
  profileId: string | null
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
      patch: null,
      profileId: null
    }
  }

  updateVerify = (value: boolean): void => this.setState({ verified: value })
  updateSummonerName = (value: string): void => this.setState({ summonerName: value })
  updateServer = (value: string): void => this.setState({ server: value })

  updateToken = (token: string): void => {
    this.setState({ sessionToken: token })
    localStorage.setItem('Authorization', token);
  }

  clearToken = (): void => {
    this.setState({ sessionToken: null });
    localStorage.removeItem('Authorization')
  }

  auth = (): boolean => localStorage.getItem('Authorization') !== null &&
    this.state.sessionToken !== null &&
    this.state.sessionToken === localStorage.getItem('Authorization')

  getPatch = async (): Promise<void> => {
    await fetch('https://ddragon.leagueoflegends.com/realms/na.json', {
      method: 'GET',
      mode: 'cors'
    })
      .then(result => result.json())
      .then(result => this.setState({ patch: result.v }))
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
          else this.setState({ sessionToken: null })
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
            this.setState({ profileId: result.profileId, verified: result.verified, server: result.server, summonerName: result.summonerName })
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
          <Nav auth={this.auth} sessionToken={this.state.sessionToken} clearToken={this.clearToken} />
          <Routes>
            <Route path='/register' element={<Register sessionToken={this.state.sessionToken} updateToken={this.updateToken} />} />
            <Route path='/login' element={<Login sessionToken={this.state.sessionToken} updateToken={this.updateToken} />} />
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search patch={this.state.patch} sessionToken={this.state.sessionToken} auth={this.auth} />} />
            <Route path='/editprofile' element={<EditProfile profileId={this.state.profileId} server={this.state.server} updateSummonerName={this.updateSummonerName} updateServer={this.updateServer} summonerName={this.state.summonerName} updateVerify={this.updateVerify} verified={this.state.verified} sessionToken={this.state.sessionToken} auth={this.auth} />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
