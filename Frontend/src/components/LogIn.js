import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LogIn = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async(e) =>{
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DB_URI}api/auth/login`,
        { email, password }
      );
      localStorage.setItem("authToken", data.token);
      setTimeout(() => {
        navigate("/")
      }, 1800)
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4500);
    }
  }
  return (
    <div className='logIn'>
        <Link to="/register">Sign Up</Link>
        <form onSubmit={handleLogIn}>
          {error&&<div>{error}</div>}
        <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
        <input
                type="password"
                required
                id="password"
                placeholder="Strong Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
        <Link to="/forgotpassword">Forgot Password ?</Link>
        <button type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default LogIn