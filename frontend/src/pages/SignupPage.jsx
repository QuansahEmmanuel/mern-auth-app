import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from "../AuthContext"


const SignupPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, user } = useContext(AuthContext)
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        try {
            await signup(username, email, password)
            navigate("/login")
        } catch (err) {
            setError(err.message)
        }

    }


    return (
        <div className='login_container'>
            <div className='login_container_wrapper'>
                <h1>Signup</h1>
                <div className='login_input_wrapper'>
                    <input type="text" placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                <button type='submit' onClick={handleSubmit}>Signup</button>
                <p>Don't have an account? {" "} <Link to="/login">Login</Link> </p>
            </div>
        </div>
    )
}

export default SignupPage