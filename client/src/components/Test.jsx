import React from "react";

export const Test = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:4000/api/v1/user/auth/google";
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Test;
