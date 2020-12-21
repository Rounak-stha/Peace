import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
import {useUserContext} from '../../../userContext'
import './SidebarComponent.css'

function SidebarComponent({name, Icon, dNone, className, children}) {
    let history = useHistory()
    let path = useLocation().pathname.slice(1)
    const {mobile} = useUserContext()
    function handleClick() {
        history.push(`/${name}`)  // redirects to ${name}
    } 
    return (
        <div 
            className={className}
            onClick={() => handleClick()}
        >
            {children ? children :
            <>
            <div className="sidebar-icon">
                <Icon className='icon' fontSize='large'  style={{color: path === name ? "#50b7f5" :( mobile ? "#6e7a75" :'white')}}/>
            </div>
            <p className={`icon-name ${dNone}`}>{name}</p>
            </>
            }
        </div>
    )
}

export default SidebarComponent
