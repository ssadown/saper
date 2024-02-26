import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import Login from './Login';
import LevelPage from './LevelPage';
import LeaderPage from './LeaderPage';
import { loginContext, leaderDashboardContext, currentUserContext, gameSettingsContext } from './../contexts/Context';
import GamePage from './GamePage';
import CustomLevelPage from './CustomLevelPage';

const App = () => {
  const [isLogin, setLogin] = useState(false)
  const [user, setUser] = useState({})
  const [leaderDashboard, setLeaderDashboard] = useState([])
  const [isNewUser, setNewUser] = useState(true)
  const [gameSettings, setGameSettings] = useState({})


  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true)
    }
    if (localStorage.getItem('leaderDashboard')) {
      setLeaderDashboard(JSON.parse(localStorage.getItem('leaderDashboard')))
    }
    if (localStorage.getItem('currentUser')) {
      setUser(JSON.parse(localStorage.getItem('currentUser')))
    }
}, [])

  return (
    isLogin ?
    <gameSettingsContext.Provider value={{gameSettings, setGameSettings}}>
      <currentUserContext.Provider value={{user, setUser}}>
        <leaderDashboardContext.Provider value={{leaderDashboard, setLeaderDashboard, isNewUser, setNewUser}}>
          <loginContext.Provider value={{isLogin, setLogin}}>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<LevelPage/>}/>
                <Route exact path="/leader" element={<LeaderPage/>}/>
                <Route exact path="/game" element={<GamePage/>}/>
                <Route exact path="/custom" element={<CustomLevelPage/>}/>
                <Route exact path="*" element={<PageNotFound/>}/>
              </Routes>
            </BrowserRouter>
          </loginContext.Provider>
        </leaderDashboardContext.Provider>
      </currentUserContext.Provider>
    </gameSettingsContext.Provider>
    :
    <currentUserContext.Provider value={{user, setUser}}>
      <leaderDashboardContext.Provider value={{leaderDashboard, setLeaderDashboard, isNewUser, setNewUser}}>
        <loginContext.Provider value={{isLogin, setLogin}}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="*" element={<PageNotFound/>}/>
            </Routes>
          </BrowserRouter>
        </loginContext.Provider>
      </leaderDashboardContext.Provider>
    </currentUserContext.Provider>
  )
}

export default App;
