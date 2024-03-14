import React from "react";
import UserApi from "../apis/userApi";

export const Test = () => {
    const handleLogin = () => {
        UserApi.get("/auth/google")
            .then((response) => {
                console.log(response.data); // Handle successful authentication
            })
            .catch((error) => {
                console.error(error); // Handle error
            });
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Test;
