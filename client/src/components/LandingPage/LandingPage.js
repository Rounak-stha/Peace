import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace } from '@fortawesome/free-solid-svg-icons'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import './LandingPage.css'

function LandingPage() {
    const [isSignedUp, setIsSignedUp] = useState(true)

    return (
        <div className='landing-page'>
            <div className="landing-header">
                <div className="landing-header-icon"><FontAwesomeIcon icon={faHandPeace}/></div>
                <p>{isSignedUp ? "Login to Peace" : "Register and find Peace"}</p>
            </div>
            <div className='paper'>
                {isSignedUp ? 
                    <Login setIsSignedUp={setIsSignedUp}/> :
                    <SignUp setIsSignedUp={setIsSignedUp} />    
                }
            </div>
        </div>
    )
}

export default LandingPage
