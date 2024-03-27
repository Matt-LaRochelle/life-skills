import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="login__container">
            <section>
                <div className="color"></div>
                <div className="color"></div>
                <div className="color"></div>
                <div className='box'>
                    <div className='square' style={{ '--i': 0 }}></div>
                    <div className='square' style={{ '--i': 1 }}></div>
                    <div className='square' style={{ '--i': 2 }}></div>
                    <div className='square' style={{ '--i': 3 }}></div>
                    <div className='square' style={{ '--i': 4 }}></div>
                    <div className="container">
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Log In</h2>
                            <div className="inputBox">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className='inputBox'>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className='login-signup-flex'>

                                <div className='inputBox login'>
                                    <input type="submit" value="Login" disabled={isLoading} />
                                </div>
                                <p className="OR">Or</p>
                                <Link to="/signup" className="signup-button">Signup</Link>
                            </div>

                            <p className='forget'>Forgot your password? <Link to="/forgot">Reset it here</Link></p>
                            {error && <div className='error'>{error}</div>}
                            {isLoading && 
                                    <div className="loading">
                                        <p>Fetching data from server...</p>
                                        <p>This process tends to take 5-60 seconds</p>
                                        <ClimbingBoxLoader color="#36d7b7" />
                                    </div>}
                        </form>
                    </div>
            
                </div>
            </section>
        </div>
    )
}

export default Login