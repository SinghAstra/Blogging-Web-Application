import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_DB_URI}api/auth/forgotpassword`,
                { email }
            );
            setSuccess(data.message);
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }
    return (
        <div>
            <form onSubmit={handleForgotPassword}>
                {error && <div>{error}</div>}
                {success && <div>{success} - <Link to="/">Go Home</Link></div>}
                <input
                    type="email"
                    required
                    id="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit'>Send Email</button>
            </form>
        </div>
    )
}

export default ForgotPassword