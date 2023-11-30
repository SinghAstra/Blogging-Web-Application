import React, { useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = React.createContext();

const AuthContextProvider = props => {
    const token = localStorage.getItem('authToken');
    const [hasToken,setHasToken] = useState(token?true:false);
    const [activeUser, setActiveUser] = useState({})
    const [auth,setAuth] = useState(hasToken);

    useEffect(() => {
        const controlAuth = async () => {
            console.log("controlAuth is called.");
            try {
                const response = await axios.get(`${process.env.REACT_APP_DB_URI}api/auth/private`, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    }
                }
                );
                const data = response.data;
                setActiveUser(data.user)
                setAuth(true)
            }
            catch (error) {
                localStorage.removeItem("authToken");
                setActiveUser({})
                setAuth(false)
            }
        };
        if(hasToken){
            controlAuth()
        }
    }, [hasToken])

    return (
        <AuthContext.Provider value={{auth, activeUser, setActiveUser,setHasToken}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
