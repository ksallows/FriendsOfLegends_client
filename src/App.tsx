import APIURL from './helpers/environment'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChampionListData, ChampionIdData, filters, baseUrl } from './d'
import Nav from './components/Nav'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Search from './components/search/Search';
import EditProfile from './components/profile/EditProfile';
import ViewProfile from './components/profile/ViewProfile';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import './App.css';

// TODO when you first log in, profileInfo isn't loaded in
// fixed! 2/7/22

interface AppValues {
  app_sessionToken: string | null,

  app_server: string | null,
  app_summonerName: string | null,
  app_verified: boolean,
  app_profileId: string | null,

  app_patch: string | null,

  app_championNameList: string[] | null,
  app_championValues: ChampionListData[] | null,
  app_championIdsToName: ChampionIdData,
  app_admin: boolean
}

class App extends React.Component<{}, AppValues> {
  constructor(props: {}) {
    super(props)
    this.state = {
      app_sessionToken: null,

      app_server: null,
      app_summonerName: null,
      app_verified: false,
      app_patch: null,
      app_profileId: null,
      app_championNameList: null, // 1 dimensional array of all champ names    
      app_championValues: null,   // {{label: 'Aatrox', value: '266'}, ...}
      app_championIdsToName: { n0: '' }, // {n266: 'AAtrox, ...}
      app_admin: false
    }
  }

  updateVerify = (value: boolean): void => this.setState({ app_verified: value })
  updateSummonerName = (value: string | null): void => this.setState({ app_summonerName: value })
  updateServer = (value: string | null): void => this.setState({ app_server: value })
  updateProfileId = (value: string): void => this.setState({ app_profileId: value })

  updateToken = (token: string): void => {
    this.setState({ app_sessionToken: token })
    localStorage.setItem('Authorization', token);
  }

  clearToken = (): void => {
    this.setState({
      app_sessionToken: null,
      app_summonerName: null,
      app_verified: false,
      app_profileId: null
    });
    localStorage.removeItem('Authorization');
  }

  getPatch = async (): Promise<void> => {
    await fetch('https://ddragon.leagueoflegends.com/realms/na.json', {
      method: 'GET',
      mode: 'cors'
    })
      .then(result => result.json())
      .then(result => this.setState({ app_patch: result.v }))
  }

  checkToken = async (): Promise<void> => {
    // if storage and state has token, check token for expiration and authenticity
    if (localStorage.getItem('Authorization') !== undefined && this.state.app_sessionToken === null) {
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
            this.setState({ app_sessionToken: localStorage.getItem('Authorization') })
          else this.setState({ app_sessionToken: null })
          return result.json()
        })
        .then(() => this.getProfileInfo())
    }
  }

  getProfileInfo = async () => {
    //if (this.state.app_sessionToken !== null) {
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
        this.setState({
          app_admin: result.admin,
          app_profileId: result.profileId,
          app_verified: result.verified,
          app_server: result.server,
          app_summonerName: result.summonerName
        })
      })
  }
  //  }

  componentDidMount = () => {
    this.checkToken()
    this.getPatch()
    for (let i = 0; i < 5 || this.state.app_championValues !== null; i++) {
      setTimeout(async () => {
        if (this.state.app_patch !== null) {
          await fetch(`${baseUrl}${this.state.app_patch}/data/en_US/champion.json`)
            .then(result => result.json())
            .then(result => {
              this.setState({ app_championNameList: Object.keys(result.data) })
              let champData: ChampionListData[] = [];
              let champIds: ChampionIdData = {}
              Object.keys(result.data).map(key => {
                champData.push({ value: result.data[key].key, label: Object.keys(filters).includes(result.data[key].id) ? filters[key] : result.data[key].id });
                champIds[`n${result.data[key].key}`] = result.data[key].id
                return null
              })
              this.setState({ app_championValues: champData, app_championIdsToName: champIds })
            })
        }
      }, 1000)
    }
  }

  render() {
    return (
      <>
        <div id='footer-helper'>
          <Router>
            <Nav app_admin={this.state.app_admin} app_sessionToken={this.state.app_sessionToken} app_clearToken={this.clearToken} />
            <Routes>
              <Route path='/register' element={<Register app_updateProfileId={this.updateProfileId} app_sessionToken={this.state.app_sessionToken} app_updateToken={this.updateToken} />} />
              <Route path='/login' element={<Login app_getProfileInfo={this.getProfileInfo} app_sessionToken={this.state.app_sessionToken} app_updateToken={this.updateToken} />} />
              <Route path='/' element={<Home app_sessionToken={this.state.app_sessionToken} />} />
              <Route path='/search' element={<Search
                app_championNameList={this.state.app_championNameList}
                app_championValues={this.state.app_championValues}
                app_patch={this.state.app_patch}
                app_sessionToken={this.state.app_sessionToken}
                app_championIdsToName={this.state.app_championIdsToName} />} />
              <Route path='/editprofile'
                element={<EditProfile
                  app_patch={this.state.app_patch}
                  app_profileId={this.state.app_profileId}
                  app_server={this.state.app_server}
                  app_updateSummonerName={this.updateSummonerName}
                  app_updateServer={this.updateServer}
                  app_summonerName={this.state.app_summonerName}
                  app_updateVerify={this.updateVerify}
                  app_verified={this.state.app_verified}
                  app_sessionToken={this.state.app_sessionToken}
                  app_championNameList={this.state.app_championNameList}
                  app_championValues={this.state.app_championValues}
                  app_championIdsToName={this.state.app_championIdsToName}
                />}
              />
              <Route path='/p/:profileId' element={
                <ViewProfile
                  app_verified={this.state.app_verified}
                  app_profileId={this.state.app_profileId}
                  app_sessionToken={this.state.app_sessionToken}
                  app_patch={this.state.app_patch}
                  app_championIdsToName={this.state.app_championIdsToName}
                  app_admin={this.state.app_admin}
                />}
              />
              <Route path='admin' element={<AdminPanel app_sessionToken={this.state.app_sessionToken} />} />
            </Routes>
          </Router>

        </div>
        <Footer />
        <div id='cover'></div>
        <div id='gradient'></div>
      </>
    );
  }
}

export default App;
