import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })


    // check to see if the user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        const validateUser = async () => {
            if (user) {
                // Check if the token is valid or invalid
                const response = await fetch('http://localhost:4000/api/user/check', {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    const json = await response.json()
                    // This JSON has the skills document in it - set the global state
                    
                    //TO DO ^^^


                    console.log(json)

                    if (response.ok) {
                        dispatch({ type: 'LOGIN', payload: user })
                    }
                    else {
                        dispatch({ type: 'LOGOUT', payload: null})
                    }
                }
            }
        validateUser()
    }, [])

    // This is part of the old code and used for debugging
    // console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}