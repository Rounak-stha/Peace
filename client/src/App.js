import React, {useState} from 'react';
import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import {BrowserRouter, Route} from 'react-router-dom'
import {AuthContext} from './Auth'
import config from './config'
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authenticated") === 'true')
  const [user, setUser] = useState({})

  const server = "http://localhost:8888" // config.server
 
  
  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, server}}>
      <BrowserRouter>
        <Route exact path='/login' component={LandingPage}/>
        <ProtectedRoute path='/' Component={Dashboard} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
