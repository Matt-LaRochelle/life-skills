import { SkillsContext } from "../context/SkillContext";
import { useContext } from 'react'

export const useSkillsContext = () => {
    const context = useContext(SkillsContext)

    if (!context) {
        throw Error('useSkillsContext must be used inside a SkillsContextProvider')
    }
    
    return context
}