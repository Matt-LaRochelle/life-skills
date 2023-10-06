import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
// import { useSkillsContext } from './useSkillsContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    // const { dispatch: skillsDispatch } = useSkillsContext()
    
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        // const userEmail = json.email.toString()
        // const userToken = json.token.toString()
        // const userSkills = json.skill

        // console.log("skills:", userSkills);

        // Create local storage cookie for signup
        // let cookie = {
        //         email: userEmail,
        //         token: userToken
        //     }


        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // set the skills context
            // skillsDispatch({type: 'SET_SKILLS', payload: userSkills})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}