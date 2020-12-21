import {createContext, useContext} from 'react'

export const AuthContext = createContext(); // AuthContext -context object

export function useAuth(){
    return useContext(AuthContext) // useContext(contextObject) - current context value for the contect 
                                    // determined by the value prop of the nearesat context provider.
}