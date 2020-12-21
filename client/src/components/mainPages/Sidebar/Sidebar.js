import React from 'react'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace } from '@fortawesome/free-solid-svg-icons'
import SidebarComponent from '../SidebarComponent/SidebarComponent'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import {useAuth} from "../../../Auth"

import './Sidebar.css'
function Sidebar({id, sIcon, dNone}) {
    const {setIsAuthenticated} = useAuth()
    function handleLogout() {
        localStorage.clear()
        setIsAuthenticated(false)
    }
    return (
            <div id={id}>
                <div className="peace-icon">
                <FontAwesomeIcon icon={faHandPeace}/>
                </div>
                <SidebarComponent className="sidebar-component" name="Home" Icon={HomeIcon} dNone={dNone} />
                <SidebarComponent className={`sidebar-component ${sIcon}`} name="Search"><SearchIcon /></SidebarComponent>
                <SidebarComponent className="sidebar-component" name="Profile" Icon={PersonIcon} dNone={dNone} />
                <Button 
                    className={`peace-button ${dNone}`}
                    variant="contained" 
                    onClick={handleLogout}
                >Peace Out</Button>
        </div>
    )
}

export default Sidebar
