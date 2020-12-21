import React, { useState } from 'react'
import {useAuth} from '../../Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from "react-router-dom"
import '../logsign.css'

// <FontAwesomeIcon icon={faSpinner} spin/>

function Login({setIsSignedUp}) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const [logInSuccess, setlogInSuccess] = useState(true)
    const [logInAttempt, setlogInAttempt] = useState(false)
    const [error, setError] = useState('')
    
    const {isAuthenticated, setIsAuthenticated, server} = useAuth()

    async function handleLogin(e) {
        e.preventDefault()
        if (userName.length === 0 || password.length === 0) return
        setlogInAttempt(true)
        fetch(`${server}/post/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userName, password})
        })
            .then((res) => {
                //console.log(res)
                return res.json()
            })
            .then((res) => {
                if (res.error) {
                    setError(res.error)
                    setlogInSuccess(false)
                    setlogInAttempt(false)
                }
                if (res.success) {
                    localStorage.setItem('authenticated', 'true')
                    localStorage.setItem("displayName", res.user.displayName)
                    localStorage.setItem("userName", res.user.userName)
                    localStorage.setItem('avatarSrc', res.user.avatarSrc)
                    setIsAuthenticated(true)
                }
            })
            .catch(() => {
                setError("Network Problem!")
                setlogInAttempt(false)
            })
    }


    return (
        isAuthenticated ? <Redirect to='/Home'/> :
        <div className="logsign-main">
        {error ? <p style={{color: "red"}}>{error}</p> : null}
            <form className='logsign-form' onSubmit={(e) => handleLogin(e)}>
                <div>
                    <span id="user-place">Username</span>
                    <input 
                        className="userName-input"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onFocus={() => document.getElementById("user-place").classList.add("focused")}
                        onBlur={() => document.getElementById("user-place").classList.remove("focused")}
                    />
                </div>
                <div>
                    <span id="pass-place">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => document.getElementById("pass-place").classList.add("focused")}
                        onBlur={() => document.getElementById("pass-place").classList.remove("focused")}
                    />
                </div>
                <button
                    type='submit'
                >{logInAttempt ? <FontAwesomeIcon icon={faSpinner} spin/> : "Login"}
                </button>
            </form>
            <div className="logSign-footer">
                {logInAttempt ? 
                    <p>Logging you in. Please wait...</p> :
                    (logInSuccess ? <p>Not Signedup Yet</p> : <p style={{color: "red"}}>"Could log in, please try again"</p>)    
                }
                <p className="link" onClick={() => setIsSignedUp(false)}>SignUp</p>
            </div>
        </div>
    )
}

export default Login

