import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Signup({ updateUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
    };

    const createUser = async () => {
        try {
            // Make a POST request to create a new user
            const newUser = {
                email: email,
                password: password,
            };
            // Adjust the API endpoint according to your backend routes
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/createManual`,
                newUser
            );

            // Redirect to the homepage after successful user creation
            if (response.status === 201) {
                updateUser(newUser);
                window.location.href = "/"; // Redirect to the homepage
            }
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Sign up Form</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="./images/signup.jpg" alt="signup" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Create Account</h2>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={styles.btn} onClick={createUser}>
                        Sign Up
                    </button>
                    <p className={styles.text}>or</p>
                    <button className={styles.google_btn} onClick={googleAuth}>
                        <img src="./images/google.png" alt="google icon" />
                        <span>Sign up with Google</span>
                    </button>
                    <p className={styles.text}>
                        Already Have Account ? <Link to="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
