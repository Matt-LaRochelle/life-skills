import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useSkillsContext } from './useSkillsContext'
// import { useSetup } from './useSetup'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const { skillsDispatch } = useSkillsContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        // need to separate the login payload from the skills payload
        const userEmail = json.email.toString()
        const userToken = json.token.toString()
        const userSkills = json.skill

        console.log("email:", userEmail);
        console.log("token:", userToken);
        console.log("skills:", userSkills);

        // Create local storage cookie
        const cookie = {
            user: {
                email: userEmail,
                token: userToken
            }
        }
        console.log("cookie:", cookie)



        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(cookie))

            // update the auth context
            dispatch({type: 'LOGIN', payload: cookie})
            // skillsDispatch({type: 'SET_SKILLS', payload: userSkills})

            // set new skills list
            // await setup(json)

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}