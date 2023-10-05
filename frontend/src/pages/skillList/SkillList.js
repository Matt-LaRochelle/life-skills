// import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { format } from 'date-fns';

import './skillList.css'

const SkillList = () => {

    const {user} = useAuthContext()
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'EEEE, MMMM do, y');
    console.log(formattedDate);


    return (
        <div className="skillList__container">
            <h2>Life Skills:</h2> 
            <p>{formattedDate}</p>
            <ul>
                <li><span>Done</span>Exercise consistently</li>
                <li><span>Done</span>Personal finance</li>
                <li><span>Done</span>Meditation</li>
                <li><span>Done</span>Communication</li>
                <li><span>Done</span>Waking up early</li>
                <li><span>Done</span>Public speaking</li>
                <li><span>Done</span>Getting honest with yourself</li>
                <li><span>Done</span>Leadership skills</li>
                <li><span>Done</span>Decision making</li>
                <li><span>Done</span>Listening</li>
            </ul>
        </div>
    )
}

export default SkillList