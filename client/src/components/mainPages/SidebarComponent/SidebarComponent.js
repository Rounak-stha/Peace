import React from 'react'
import { useHistory } from "react-router-dom";
import './SidebarComponent.css'

function SidebarComponent({name, Icon}) {
    let history = useHistory()
    function handleClick() {
        history.push(`/${name}`)  
    } 
    return (
        <div 
            className="sidebar-component"
            onClick={() => handleClick()}
        >
            <div className="sidebar-icon">
                <Icon className="icon" fontSize='large' style={{color: 'white'}}/>
            </div>
            <p className="icon-name">{name}</p>
        </div>
    )
}

export default SidebarComponent
