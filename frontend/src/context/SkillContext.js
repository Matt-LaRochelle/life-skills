import { createContext, useReducer } from 'react'

export const SkillsContext = createContext()

export const skillsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SKILLS':
            return {
                skills: action.payload
            }
        default:
            return state
    }
}

export const SkillsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(skillsReducer, {
        skills: null
    })

    console.log('SkillsContext state: ', state)

    return (
        <SkillsContext.Provider value={{...state, dispatch}}>
            { children }
        </SkillsContext.Provider>
    )
}