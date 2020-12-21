import React from 'react'
import {useUserContext} from '../../../userContext'
import SideSearch from '../SideSearch/SideSearch'
import Header from '../Header/Header'

function SearchPage() {
    const {myData} = useUserContext()
    console.log(myData)
    return (
        <div className="middle">
            <Header src={myData.avatarSrc}>
                <SideSearch />
            </Header>
        </div>
    )
}

export default SearchPage
