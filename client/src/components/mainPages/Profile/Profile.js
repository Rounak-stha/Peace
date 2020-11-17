import React, {useState, useEffect, useRef} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar } from '@material-ui/core';
import {useUserContext} from '../../../userContext'
import {useAuth} from '../../../Auth'
import Post from "../Post/Post"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import "./Profile.css"

function Profile({match, location}) {
    const [loading, setLoading] = useState(true)
    const [loadingAll, setLoadingAll] = useState(true)
    const [networkError, setNetworkError] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [stalkingUser, setStalkingUser] = useState(false)
    const [following, setFollowing] = useState(false)
    const [shouldFetch, setshouldFetch] = useState(true)  
    const [lastProfile, setLastProfile] = useState('')

    let myPosts = useRef(null)
    let followBtn = useRef(null)
    const profileData = useRef(null)

    const {myData} = useUserContext()
    const {server} = useAuth()

    useEffect(() => {
        if (!lastProfile) { 
            setLastProfile(match.isExact ? location.pathname : location.search) 
            return
        }
        
        const currentProfile = match.isExact ? location.pathname : location.search  
        if (lastProfile !== currentProfile) {   
            setLastProfile(currentProfile)
        }
    })

    useEffect(() => {
        if (!lastProfile) return 
        if (!match.isExact) {   
            const names = location.search.split('&').map((name) => name.split('=')[1])
            profileData.current = {userName: names[0], displayName: names[1]}
            setLoadingAll(false)
            setLoading(true)
            setshouldFetch((prevState) => !prevState)  
            setStalkingUser(true)
        }
            
        else if (match.isExact){
            // console.log("exact match")
            profileData.current = {displayName: myData.displayName, userName: myData.userName, avatarSrc: myData.avatarSrc}
            setLoadingAll(false)
            setLoading(true)
            setshouldFetch((prevState) => !prevState) 
            setStalkingUser(false)
        }
    }, [lastProfile])
    
    

    useEffect(() => {
        if (!lastProfile) return
        const reqBody = stalkingUser ? {userName: profileData.current.userName, myName: myData.userName} : {userName: profileData.current.userName}
        fetch(`${server}/post/profileData`, {
            method: "post",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(reqBody)
        })
            .then((res)=> {
                if (!res.ok) throw res 
                return res.json() 
            })
            .then((data) => {
                myPosts.current = data.posts 
                profileData.current.following = data.following;
                profileData.current.followers = data.followers;
                profileData.current.avatarSrc = data.avatarSrc;

                setLoading(false)
                setFollowing(data.iFollow)
            })
            .catch((err) => {
                console.log(err)
                if (err.ok === false) setServerError(true) 
                else setNetworkError(true)
            })
    }, [shouldFetch])

    async function handleFollow() {
        const followRoute = following ? "unFollow" : "follow"
        const reqBody = following ? {unFollower: myData.userName, unFollowing: profileData.current.userName} : {follower: myData.userName, following: profileData.current.userName}
        setFollowing((prevState) => !prevState)
        await fetch(`${server}/post/${followRoute}`, {
            method: "post",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(reqBody)
        })
            .then((res) => {
                if (!res.ok) {
                    setNetworkError(true)
                    setFollowing((prevState) => !prevState)
                } 
            })
    }
    return (
            loadingAll ? <div className="loading-spinner">
                            <FontAwesomeIcon icon={faSpinner} spin/>   
                         </div> : 
            <div className="profile-wrapper">
                <header className="header">
                    {networkError || serverError ? (networkError ? <h2 style={{color: "red"}}>No internet connection!</h2> : <h2 style={{color: "red"}}>Error! Try again</h2>) : 
                        stalkingUser ? <h2>{profileData.current.displayName}</h2> : <h2>Profile</h2>}
                </header>
                <div className="profile-head">
                    <div>
                    <Avatar className="user-avatar" src={profileData.current.avatarSrc} />
                    <Card className="profile-card">
                        <CardHeader 
                            className="profile-name"
                            title={profileData.current.displayName}
                            subheader={`@${profileData.current.userName}`}
                        />
                        <CardContent className="follow-data">
                            <p className="following"><b>{profileData.current.following}</b><span> Following</span></p>
                            <p className="followers"><b>{profileData.current.followers}</b><span> Followers</span></p>
                        </CardContent>
                    </Card>
                    </div>
                    {stalkingUser ? <div className="follow-btn" onClick={handleFollow}>
                        <button 
                            style={{background: following ? "#50b7f5" : "#151e29", color: following ? "white" : "#50b7f5"}}
                            ref={followBtn}
                            onMouseOver={() => {
                                followBtn.current.style.background = following ? "red" : "#1b2740"
                                followBtn.current.style.color = following ? "white" : "#50b7f5"
                            }} 
                            onMouseLeave={() => followBtn.current.style.background = following ? "#50b7f5" : "#151e29"}
                        >{following ? "Unfollow" : "Follow"}
                        </button>
                    </div> : null}
                </div> 
                {networkError || serverError ? null : 
                     loading ? <div className="loading-spinner">
                                    <FontAwesomeIcon icon={faSpinner} spin/>  
                                </div> :
                        myPosts.current.map((post, i) => (
                            <Post 
                                key={i}
                                displayName={profileData.current.displayName}
                                userName={profileData.current.userName}
                                avatarSrc={profileData.current.avatarSrc}
                                postText={post}
                            />
                        )) 
                }
            </div>
    )
}

export default Profile