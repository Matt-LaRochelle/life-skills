import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useSkillsContext } from '../../hooks/useSkillsContext'
import { format } from 'date-fns';

import './skillList.css'

const SkillList = () => {
    const {user} = useAuthContext()
    const {skills, dispatch} = useSkillsContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    const [numberComplete, setNumberComplete] = useState(0)
    const [retrieveSkillsData, setRetrieveSkillsData] = useState(false)

    // Get today's date
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'EEEE, MMMM do, y');

    // Get the skills document AND set skills context 
    useEffect(() => {
        const getSkillsObject = async () => {
            setIsLoading(true)
            const response = await fetch('http://localhost:4000/api/skill/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()
            
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                dispatch({type: 'SET_SKILLS', payload: json})   
                setIsLoading(false)
            }
        }
    getSkillsObject()

    // trigger by the retreival of the skills data after a patch
    }, [retrieveSkillsData])

    // This useEffect will be used to update the score for today
    useEffect(() => {
        let total = 0;

        for (const item in skills) {
            if (skills[item] === true) {
              total++;
            }
        }
        setNumberComplete(total);

    // trigger by skills to get total after skills state has been updated
    }, [skills])


    // Update specific skill in the object
    const handleClick = async (e) => {
        const skill = e.target.id;
        const currentValueOfThisSkill = skills[skill]

        // make the const skill the key in this patchObject
        const patchObject = {[skill]: !currentValueOfThisSkill}

        const response = await fetch(`https://life-skills.onrender.com/api/skill/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(patchObject)
        })

        const json = await response.json()
        
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setRetrieveSkillsData(prevValue => !prevValue)
            setIsLoading(false)
        }
    };


    return (
        <div className="skillList__container">
            <p>{formattedDate}</p>
            <p>Total: {numberComplete}</p>
            {error & <div>{error}</div>}
            {isLoading & <p>Retrieving documents from server</p>}
            {skills &&
            <ul>
                <li><span id="exe" onClick={handleClick}>{skills.exe === false ? "To Do" : "Done"}</span>Exercise consistently</li>
                <li><span id="fin" onClick={handleClick}>{skills.fin === false ? "To Do" : "Done"}</span>Personal finance</li>
                <li><span id="med" onClick={handleClick}>{skills.med === false ? "To Do" : "Done"}</span>Meditation</li>
                <li><span id="com" onClick={handleClick}>{skills.com === false ? "To Do" : "Done"}</span>Communication</li>
                <li><span id="upE" onClick={handleClick}>{skills.upE === false ? "To Do" : "Done"}</span>Waking up early</li>
                <li><span id="pub" onClick={handleClick}>{skills.pub === false ? "To Do" : "Done"}</span>Public speaking</li>
                <li><span id="hon" onClick={handleClick}>{skills.hon === false ? "To Do" : "Done"}</span>Getting honest with yourself</li>
                <li><span id="lea" onClick={handleClick}>{skills.lea === false ? "To Do" : "Done"}</span>Leadership skills</li>
                <li><span id="dec" onClick={handleClick}>{skills.dec === false ? "To Do" : "Done"}</span>Decision making</li>
                <li><span id="lis" onClick={handleClick}>{skills.lis === false ? "To Do" : "Done"}</span>Listening</li>
            </ul>
            }
        </div>
    )
}

export default SkillList