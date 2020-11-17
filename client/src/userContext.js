import {createContext, useContext} from 'react'

export const userContext = createContext();

export function useUserContext() {
    return useContext(userContext)
}