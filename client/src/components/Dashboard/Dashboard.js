import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Sidebar from '../mainPages/Sidebar/Sidebar'
import Home from '../mainPages/Home/Home'
import Profile from '../mainPages/Profile/Profile'
import SearchPage from '../mainPages/SearchPage/SearchPage'
import SideSearch from "../mainPages/SideSearch/SideSearch"
import {userContext} from '../../userContext'
import './Dashboard.css'
function Dashboard() {
    // pull data from database on the first render
    const myData = {displayName: localStorage.getItem("displayName"), userName: localStorage.getItem("userName"), avatarSrc: localStorage.getItem('avatarSrc')}
    let mobile = window.innerWidth < 800
    return (
        <userContext.Provider value={{myData, mobile}}>
            <div className='main-dashboard'>
                <Sidebar id="sidebar" sIcon="search-icon" dNone="dis-none" />
                {/* feed */}
                <Route exact path="/" render={() => <Redirect to="/Home"/>}/>
                <Route path="/Home" render={() => <Home />}/> 
                <Route path="/Profile" render={(props) => <Profile {...props}/>} />
                <Route path="/Search" render={() => <SearchPage />}/> 
                <SideSearch className="mSsearch-wrapper" />
            </div>
        </userContext.Provider>
    )
}

export default Dashboard
