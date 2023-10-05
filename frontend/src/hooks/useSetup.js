import { useState } from 'react'
// import { useSkillsContext } from './useSkills'

export const useSetup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const { dispatch } = useSkillsContext()

    const setup = async (jSon) => {
        setIsLoading(true)
        setError(null)
        console.log("step 1")
        console.log(jSon)

        const response = await fetch('http://localhost:4000/api/skill/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jSon.token}`
            },
            body: JSON.stringify({
                "exe": false,
                "fin": false,
                "med": false,
                "com": false,
                "upE": false,
                "pub": false,
                "hon": false,
                "lea": false,
                "dec": false,
                "lis": false,
            })
        })
        const json = await response.json()
        console.log("step 2")

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // update the auth context
            // dispatch({type: 'CREATE_SKILLS', payload: json})

            setIsLoading(false)
        }
    }

    return { setup, isLoading, error }
}