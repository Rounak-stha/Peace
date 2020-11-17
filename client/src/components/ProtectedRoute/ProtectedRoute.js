import React from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useAuth} from '../../Auth'

function ProtectedRoute({Component, ...rest}) {
    const {isAuthenticated} = useAuth()
    return (
        isAuthenticated ? 
        <Route {...rest} render={(props) => 
            <Component {...props} test='test' />} 
        /> :
        <Redirect to='/login' />
    )
}

export default ProtectedRoute
