import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='navbar'>
        <h1><Link to="/">Snap Blog</Link></h1>
        <Link to="/logIn">Log In</Link>
        <Link to="/register">Get Started</Link>
    </div>
  )
}

export default Header