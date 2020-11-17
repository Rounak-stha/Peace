import React from 'react'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace } from '@fortawesome/free-solid-svg-icons'
import SidebarComponent from '../SidebarComponent/SidebarComponent'
import HomeIcon from '@material-ui/icons/Home'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import {useAuth} from "../../../Auth"

import './Sidebar.css'
function Sidebar() {
    const {setIsAuthenticated} = useAuth()

    function handleLogout() {
        localStorage.clear()
        setIsAuthenticated(false)
    }
    return (
            <div id="sidebar">
            <div className="peace-icon">
            <FontAwesomeIcon icon={faHandPeace}/>
            </div>
            <SidebarComponent name="Home" Icon={HomeIcon}/>
            <SidebarComponent name="Profile" Icon={PersonOutlineIcon}/>
            <Button 
                className="peace-button" 
                variant="contained" 
                onClick={handleLogout}
            >Peace Out</Button>
        </div>
    )
}

export default Sidebar
