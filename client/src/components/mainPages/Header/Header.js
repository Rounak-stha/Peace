import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './Header.css'

function Header({children, style, src}) {
    return (
        <header className="header" style={style}>
            <input type="checkbox" id="toggleInput" />
            <div className="mble-sidbar">
                <div className="mSidebar-header">
                    <h2>Acc Info</h2>
                    <label htmlFor="toggleInput">
                        <CloseIcon className="mSbar-CIcon"/>
                    </label>
                </div>
                <Sidebar id="mSbar-comp" sIcon="dis-none"/>
            </div>
            <label htmlFor="toggleInput">
                <Avatar className="header-Avatar" src={src} />
            </label>
            {children}        
        </header>
    )
}

export default Header
