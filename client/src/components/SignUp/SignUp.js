import React, { useState } from 'react'
import {useAuth} from '../../Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from "react-router-dom"
import '../logsign.css'

function SignUp({setIsSignedUp}) {
    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('')
    const [signUpSuccess, setSignUpSuccess] = useState(true)
    const [signUpAttempt, setSignUpAttempt] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [allSelected, setAllSelected] = useState(true)
    const [tryingAdmin, setTryingAdmin] = useState(false)

    const {server, isAuthenticated, setIsAuthenticated} = useAuth()

    const adminRegex = /admin/i

    async function checkUserExists(){
        if (!userName) return

        fetch(`${server}/post/checkUser`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userName})
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.exists) setUserExists(true)
                else setUserExists(false)
            })
    }

    async function handleSignUp(e) {
        // an object to send
        e.preventDefault()

        if (adminRegex.test(displayName) || adminRegex.test(userName)) {
            setTryingAdmin(true)
            return
        }

        if (!displayName || !userName || !password || !avatar) {
            setAllSelected(false)
            return
        }
        setSignUpAttempt(true)
        let userCreds = {displayName, userName, password, avatar}
        fetch(`${server}/post/register`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCreds)
        })
            .then((res) =>{
                if (!res.ok) throw res
                else return res.json()  
            })
            .then((user) => {
                    console.log()
                    localStorage.setItem('authenticated', 'true')
                    localStorage.setItem("displayName", user.displayName)
                    localStorage.setItem("userName", user.userName)
                    localStorage.setItem('avatarSrc', user.avatarSrc)
                    setIsAuthenticated(true)
            })
            .catch(() => {
                setSignUpAttempt(false)
                setSignUpSuccess(false)
            })
    }
    
    return (
        isAuthenticated ? <Redirect to='/Home'/> :
        <div className="logsign-main">
            {allSelected ? null : <p style={{color: "red", margin: "2px"}}> Fillup all fields</p>}
            {tryingAdmin ? <p style={{color: "red", margin: "2px"}}> You are no admin, boy!</p> : null}

            <form className='logsign-form' onSubmit={(e) => handleSignUp(e)}>
                    <div>
                        <span id="display-place">Displayname</span>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            onFocus={() => {
                                if (tryingAdmin) setTryingAdmin(false);
                                document.getElementById("display-place").classList.add("focused")
                            }}
                            onBlur={() => document.getElementById("display-place").classList.remove("focused")}
                        />
                    </div>

                    <div>
                        <span id="user-place">Username</span>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={() => {
                                checkUserExists()
                                document.getElementById("user-place").classList.remove("focused")
                            }}
                            onFocus={() => {
                                setUserExists(false)
                                if (tryingAdmin) setTryingAdmin(false)
                                document.getElementById("user-place").classList.add("focused") 
                            }}
                        />
                    </div>
                    {userExists ? <p style={{color: "red"}}>Account exists with this userName</p> : null}

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
                    <div>
                        <select
                            type="select"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        >
                            <option value=''>-- Select Your Avatar --</option>
                            <option value="Anime">Badass anime character</option>
                            <option value="Animals">Cute Animals</option>
                            <option value="Minion">Minion</option>
                        </select>
                    </div>
                <button
                    type='submit'
                >{signUpAttempt ? <FontAwesomeIcon icon={faSpinner} spin/> : "Sign Up"}
                </button>
            </form>
            <div className="logSign-footer">
                {signUpAttempt ? 
                    <p>Signing you up. Please wait...</p> :
                    (signUpSuccess ? <p>Already Signedup?</p> : <p style={{color: "red"}}>"Could sign in, please try again"</p>)
                    
                }

                <p className="link" onClick={() => setIsSignedUp(true)}>Login</p>
            </div>
        </div>
    )
}

export default SignUp
