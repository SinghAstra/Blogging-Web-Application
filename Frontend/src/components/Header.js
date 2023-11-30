import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

const Header = () => {

  const {auth,activeUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
        <h1><Link to="/">Snap Blog</Link></h1>
        {auth?
        <>
        <Link to="/addBlog">Add Blog</Link>
        <Link to="/readList">ReadList</Link>
        <p>Username : {activeUser.username}</p>
        </>:
        <>
        <Link to="/logIn">Log In</Link>
        <Link to="/register">Get Started</Link>
        </>}
    </div>
  )
}

export default Header