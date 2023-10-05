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
        const {email, token, skill } = await response.json()

        // need to separate the login payload from the skills payload
        const json = {email, token}
        const listOfSkills = skill

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            // localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
            skillsDispatch({type: 'SET_SKILLS', payload: listOfSkills})

            // set new skills list
            // await setup(json)

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}