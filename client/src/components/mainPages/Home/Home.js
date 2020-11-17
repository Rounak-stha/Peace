import React, {useState, useEffect, useRef} from 'react'
import PeaceBox from '../PeaceBox/PeaceBox'
import Post from '../Post/Post'
import {useUserContext} from '../../../userContext'
import {useAuth} from '../../../Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './Home.css'
function Home() {
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [networkError, setNetworkError] = useState(false)
    const [serverError, setServerError] = useState(false)

    const {myData} = useUserContext()
    const {server} = useAuth()

    const posts = useRef([])

    useEffect(() => {
        if (!loadingPosts) return  
        fetch(`${server}/post/followingPosts`, {
            method: "post",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({userName: myData.userName})
        })
            .then((res) => {
                if (!res.ok) throw res
                return res.json()               
            })
            .then((data) => {
                posts.current = data.posts
                myData.avatarSrc = data.myAvatar
                setLoadingPosts(false)
            })
            .catch((err) => {
                if (!err.ok) setServerError(true)
                else setNetworkError(true)
            })
    }) 

    function loadPosts() {
        if (posts.current.length === 0) {
            return (
                <Post 
                    displayName="AdminName"
                    userName="AdminUserName"
                    avatarSrc="AdminAvatar"
                    postText="AdminPost"
                />
            )
        }
        const toLoad = []
        posts.current.forEach((user) => {
            toLoad.push(user.posts.map((post, i) => (
                <Post 
                    key={i}
                    displayName={user.displayName}
                    userName={user.userName}
                    avatarSrc={user.avatarSrc}
                    postText={post}
                />
            )))
        })
        return (toLoad)
    }
    

    return (
        <div className="main-feed">
            {/*Header */}
            <header className="header" style={{color: networkError || serverError ? "red": "white"}}>
                {networkError || serverError ? networkError ? <h2>Network Error!</h2> : <h2 >Server Error</h2> : 
                    <h2 >Home</h2>}
            </header>

            {/*Peace box*/}
            <PeaceBox userName={myData.userName} avatarSrc={myData.avatarSrc} server={server}/>

            {/*Posts*/}
            {loadingPosts ? <div className="loading-spinner">
                                <FontAwesomeIcon icon={faSpinner} spin/>  
                            </div> : 
                loadPosts()
            }
            
        </div>
    )
}

export default Home
