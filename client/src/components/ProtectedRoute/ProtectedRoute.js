import React from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useAuth} from '../../Auth'
// import auth from '../Auth/Auth'

function ProtectedRoute({Component, ...rest}) { // Higher order component
    //console.log(rest) // rest of the props
    const {isAuthenticated} = useAuth()
    return (
        isAuthenticated ? 
        <Route {...rest} render={(props) => // render props, history, location and match objects
            <Component {...props} test='test' />} 
        /> :
        <Redirect to='/login' />
    )
}

export default ProtectedRoute
