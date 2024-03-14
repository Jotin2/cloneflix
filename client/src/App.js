import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";

const App = () => {
    return (
        <UserContextProvider>
            {" "}
            <div className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signIn" element={<SignIn />} />
                    </Routes>
                </Router>
            </div>
        </UserContextProvider>
    );
};

export default App;
