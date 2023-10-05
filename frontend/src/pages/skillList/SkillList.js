// import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

import './skillList.css'

const SkillList = () => {

    const {user} = useAuthContext()


    return (
        <div className="skillList__container">
            <h2>Life Skills:</h2> 
            <ul>
                <li>Exercise consistently</li>
                <li>Personal finance</li>
                <li>Meditation</li>
                <li>Communication</li>
                <li>Waking up early</li>
                <li>Public speaking</li>
                <li>Getting honest with yourself</li>
                <li>Leadership skills</li>
                <li>Decision making</li>
                <li>Listening</li>
            </ul>
        </div>
    )
}

export default SkillList