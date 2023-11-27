import React from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <div className='logIn'>
        <Link to="/register">Sign Up</Link>
        <input type='/email' placeholder='Email'/>
        <input type='/password' placeholder='password'/>
        <Link to="/forgotpassword">Forgot Password ?</Link>
        <buttton>Log In</buttton>
    </div>
  )
}

export default LogIn