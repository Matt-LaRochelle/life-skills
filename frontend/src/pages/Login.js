import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <p>Forgot your password? <Link to="/forgot">Reset it here</Link></p>
            <button className="form-button" disabled={isLoading}>Log In</button>
            {error && <div className='error'>{error}</div>}
            {isLoading && 
                    <div className="loading">
                        <p>Fetching data from server...</p>
                        <p>This process tends to take 5-60 seconds</p>
                        <ClimbingBoxLoader color="#36d7b7" />
                    </div>}
        </form>
    )
}

export default Login