import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loginUser,
                logoutUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
