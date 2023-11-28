import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleRegister = async(e) => {
        console.log("Inside the handle Register");
        e.preventDefault();
        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 8000);
            return setError("Passwords do not match");
        }
        try {
            const {data}  = await axios.post(
              `${process.env.REACT_APP_DB_URI}api/auth/register`,
              {
                username,
                email,
                password,
              }
            );
            localStorage.setItem("authToken", data.token);
            setTimeout(() => {
              navigate('/');
            }, 1800)
          } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
              setError("");
            }, 6000);
          }

    }
    return (
        <div className='register'>
            <Link to="/logIn">Sign In</Link>
            <form onSubmit={handleRegister} className='register'>
                {error && <div >{error}</div>}
                <input
                    type="text"
                    required
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    required
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    required
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register