import React, { useState } from "react";
import axios from "axios";
import "../css/login-form.css";
import bg from "../bg.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Footer from "./footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform signup request with username, email, and password values
    const data = {
      email,
      password,
    };

    axios
      .post("http://localhost:5000/login", data)
      .then((response) => {
        const { token } = response.data;
        console.log(token);
        localStorage.setItem("token", token);
        // console.log('Data saved successfully:', response.data);
        window.alert("Login Succesfully");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        window.alert("Invalid Credentials");
      });

    // Perform login request with email and password values
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <>
     <div className='nav'>
     <Navbar/>
     </div>
      <div>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email-input">Email:</label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            <label htmlFor="password-input">Password:</label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <a href="#" className="forgot-password-link">Forgot password?</a>
          </div>
          
          <button id="loginbutton" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
