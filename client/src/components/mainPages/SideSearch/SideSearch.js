import React, {useState, useEffect, useRef} from 'react'
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";
import {useAuth} from '../../../Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './SideSearch.css'

function SideSearch() {
    const [color, setColor] = useState("#6e7a75")
    const [searchText, setSearchText] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])
    const [searchAttempt, setSearchAttempt] = useState(false)

    const {server} = useAuth()

    let history = useHistory()

    const userData = useRef(null)

    function searchedComponents() {
        if (!searchText) return
        if (searchedUsers.length === 0) {
            return (
            <div className={'searched-user-div'}>   
                    <p style={{margin: 0}}>No users found</p>
            </div>)
        }
        return (searchedUsers.map((user, i) => (
            <div className={'searched-user-div'} key={i} onClick={() => showStalkedUser(user)}>   
                <Avatar src={user.avatarSrc}/>
                <div className="searched-user-detail">
                    <p className="searchedUser-displayName">{user.displayName}</p>
                    <p className="searchedUser-userName">{`@${user.userName}`}</p>
                </div>
            </div>
        )))
    }
    useEffect(() => {
        if (searchText.length === 0) {
            setSearchedUsers([])
            return
        }
        setSearchAttempt(true)
        fetch(`${server}/post/findUsers`, {
            method: "post",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({displayName: searchText})
        }).then((res) => {
            if (!res.ok) throw res
            else return res.json()
        })
          .then((users) => {
                setSearchAttempt(false)
                setSearchedUsers(users)
          })
          .catch(() => {
              setSearchAttempt(false)
          })
    }, [searchText])

    function showStalkedUser(user) {
        userData.current = {displayName: user.displayName, userName: user.userName}
        setSearchText('')
        history.push(`/profile/visit?u=${userData.current.userName}&d=${userData.current.displayName}`)
    }
    return (
        <div className="sidesearch-wrapper">
            <div className="search-icon-div">
                <SearchIcon style={{color}}/>
            </div>
            <input 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="sidesearch-input"
                onFocus={() => setColor("#50b7f5")}
                onBlur={() => setColor("#6e7a75")}
                type="text"
            />
            {searchAttempt ? 
                <div className="searched-user-div" style={{color: " #50b7f5", paddingLeft: "30%"}}><FontAwesomeIcon icon={faSpinner} spin/></div> :
                searchedComponents()}
            
        </div>
    )
}

export default SideSearch
