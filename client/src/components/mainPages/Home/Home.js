import React, {useState, useEffect, useRef} from 'react'
import Header from '../Header/Header'
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
        if (!loadingPosts) return   // run only on initial render
        fetch(`${server}/post/followingPosts`, {
            method: "post",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({userName: myData.userName})
        })
            .then((res) => {
                if (!res.ok) throw res
                return res.json()  // dont forget return, return resolves
            })
            .then((data) => {
                posts.current = data
                setLoadingPosts(false)
            })
            .catch((err) => {
                if (!err.ok === false) setServerError(true)
                else setNetworkError(true)
            })  // to-do
    }) 

    function loadPosts() {
        if (posts.current.length === 0) {
            return (
                <Post 
                    displayName="Admin"
                    userName="peace"
                    avatarSrc="https://i.pinimg.com/originals/4d/74/ef/4d74efd894517b7d1d0325d9767fd799.png"
                    postText="Find profiles to follow... search for anime characters, dogs and cats breed, minions"
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
        <div className="main-feed middle">
            {/*Header */}
            <Header style={{color: networkError || serverError ? "red": "white"}} src={myData.avatarSrc}>
                {networkError || serverError ? networkError ? <h2>Network Error!</h2> : <h2 >Server Error</h2> : 
                    <h2>Home</h2>}
            </Header>

            {/*Peace box*/}
            <PeaceBox userName={myData.userName} avatarSrc={myData.avatarSrc} server={server}/>

            {/*Posts*/}
            {networkError || serverError ? null : 
                loadingPosts ? <div className="loading-spinner">
                                    <FontAwesomeIcon icon={faSpinner} spin/>   {/* How difficult can it be? */}
                                </div> : 
                                loadPosts()
            }
            
        </div>
    )
}

export default Home
