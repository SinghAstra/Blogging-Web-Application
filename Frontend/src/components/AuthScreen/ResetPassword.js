import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const search = useLocation().search;
    const token = search.split("=")[1];

    const resetPasswordHandler = async(e) =>{
        e.preventDefault();
        if(password!==confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(()=>{
                setError("")
            },5000)
            return setError("Passwords do not match.")
        }
        try{
            const {data} = await axios.put(
                `${process.env.REACT_APP_DB_URI}api/auth/resetpassword?resetPasswordToken=${token}`,
                {password}
            )
            setSuccess(data.message);
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return (
        <form onSubmit={resetPasswordHandler}>
            {error && <div>{error}</div>}
            {success && <div>{success} - <Link to="/login">Log IN</Link></div>}
            <input
                type="password"
                required
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                required
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type='submit'>Reset Password</button>
        </form>
    )
}

export default ResetPassword