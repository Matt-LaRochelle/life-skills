import { useAuthContext } from './useAuthContext'
import { useSkillsContext } from './useSkillsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: skillsDispatch } = useSkillsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        skillsDispatch({type: 'SET_SKILLS', payload: null})
    }
    return {logout}
}