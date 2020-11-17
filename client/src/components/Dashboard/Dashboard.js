import React from 'react'
import {Route} from 'react-router-dom'
import Sidebar from '../mainPages/Sidebar/Sidebar'
import Home from '../mainPages/Home/Home'
import Profile from '../mainPages/Profile/Profile'
import SideSearch from "../mainPages/SideSearch/SideSearch"
import {userContext} from '../../userContext'
import './Dashboard.css'
function Dashboard() {
    const myData = {displayName: localStorage.getItem("displayName"), userName: localStorage.getItem("userName"), avatarSrc: localStorage.getItem('avatarSrc')}

    return (
        <userContext.Provider value={{myData}}>
            <div className='main-dashboard'>
                <Sidebar />
                {/* feed */}
                <Route exact path="/" render={() => <Home />}/>
                <Route path="/Home" render={() => <Home />}/> 
                <Route path="/Profile" render={(props) => <Profile {...props}/>} />
                <SideSearch />
            </div>
        </userContext.Provider>
    )
}

export default Dashboard
