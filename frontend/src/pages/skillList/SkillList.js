import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { format } from 'date-fns';

import './skillList.css'

const SkillList = () => {
    const [completed, setCompleted] = useState({
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
    const [numberComplete, setNumberComplete] = useState(0)

    const {user} = useAuthContext()

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'EEEE, MMMM do, y');

    useEffect(() => {
        // Use let so that you can increment the variable
        let total = 0;
        for (const item in completed) {
            if (completed[item] === true) {
              total++;
            }
          }
        setNumberComplete(total);
    }, [completed])

    const handleClick = (e) => {
        const skill = e.target.id;
        setCompleted((prevValue) => ({
          ...prevValue,
          [skill]: !prevValue[skill],
        }));
    }


    return (
        <div className="skillList__container">
            <p>{formattedDate}</p>
            <p>Total: {numberComplete}</p>
            <ul>
                <li><span id="exe" onClick={handleClick}>{completed.exe === false ? "To Do" : "Done"}</span>Exercise consistently</li>
                <li><span id="fin" onClick={handleClick}>{completed.fin === false ? "To Do" : "Done"}</span>Personal finance</li>
                <li><span id="med" onClick={handleClick}>{completed.med === false ? "To Do" : "Done"}</span>Meditation</li>
                <li><span id="com" onClick={handleClick}>{completed.com === false ? "To Do" : "Done"}</span>Communication</li>
                <li><span id="upE" onClick={handleClick}>{completed.upE === false ? "To Do" : "Done"}</span>Waking up early</li>
                <li><span id="pub" onClick={handleClick}>{completed.pub === false ? "To Do" : "Done"}</span>Public speaking</li>
                <li><span id="hon" onClick={handleClick}>{completed.hon === false ? "To Do" : "Done"}</span>Getting honest with yourself</li>
                <li><span id="lea" onClick={handleClick}>{completed.lea === false ? "To Do" : "Done"}</span>Leadership skills</li>
                <li><span id="dec" onClick={handleClick}>{completed.dec === false ? "To Do" : "Done"}</span>Decision making</li>
                <li><span id="lis" onClick={handleClick}>{completed.lis === false ? "To Do" : "Done"}</span>Listening</li>
            </ul>
        </div>
    )
}

export default SkillList