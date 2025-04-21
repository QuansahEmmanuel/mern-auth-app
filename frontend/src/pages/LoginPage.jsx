import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useContext(AuthContext)
    const handleSubmit = async () => {
        setError("")
        try {
            await login(email, password)
            navigate("/")
        } catch (err) {
            setError(err.message)
        }

    }

    return (
        <div className='login_container'>
            <div className='login_container_wrapper'>
                <h1>Login</h1>
                <div className='login_input_wrapper'>
                    <input type="email" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                <button type='submit' onClick={handleSubmit}>Login</button>
                <p>Don't have an account? {" "} <Link to="/signup">Signup</Link> </p>
            </div>
        </div>
    )
}

export default LoginPage