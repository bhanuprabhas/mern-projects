import React, { useState } from "react";
import axios from "axios";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/navbar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollnum, setRollnum] = useState("");
  const [city, setCity] = useState("");
  const [teamno, setTeamno] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [hackerrank, setHackerrank] = useState("");
  const [edyst, setEdyst] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleRollnumChange = (event) => {
    setRollnum(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleTeamnoChange = (event) => {
    setTeamno(event.target.value);
  };

  const handleGithubChange = (event) => {
    setGithub(event.target.value);
  };

  const handleLinkedinChange = (event) => {
    setLinkedin(event.target.value);
  };

  const handleHackerrankChange = (event) => {
    setHackerrank(event.target.value);
  };

  const handleEdystChange = (event) => {
    setEdyst(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmpassword(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmpassword) {
      // Display error message if password and confirm password do not match
      console.log("Passwords do not match");
      return;
    }

    // Perform signup request with username, email, and password values
    const data = {
      username,
      lastname,
      email,
      phone,
      rollnum,
      city,
      teamno,
      github,
      linkedin,
      hackerrank,
      edyst,
      password,
      confirmpassword,
    };

    axios
      .post("http://localhost:5000/register", data)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        window.alert("Registered Succesfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        window.alert("User already Exists\n or \n Registration failed");
      });

    console.log(
      `Username: ${username}, Lastname:${lastname}, Email: ${email},Phone: ${phone},Rollnum: ${rollnum}, City:${city}, Teamno:${teamno}, Github: ${github}, Linkedin: ${linkedin}, Hackerrank: ${hackerrank}, Edyst: ${edyst}, Password: ${password}`
    );
  };

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div id="signupcontainer">
        <form id="signupform" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <div class="row">
            <label>Username</label>
            <input
              id="signupinput"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />

            <label>Lastname</label>
            <input
              id="signupinput"
              type="text"
              value={lastname}
              onChange={handleLastnameChange}
            />

            <label>Email</label>
            <input
              id="signupinput"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            <label>Phone</label>
            <input
              id="signupinput"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
            />

            <label>Rollnum</label>
            <input
              id="signupinput"
              type="text"
              value={rollnum}
              onChange={handleRollnumChange}
            />

            <label>Password</label>
            <input
              id="signupinput"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <label>Confirm Password</label>
            <input
              id="signupinput"
              type="password"
              value={confirmpassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button id="signupbutton" type="submit">
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;

// <label>Github</label>
//         <input id="signupinput" type="text" value={github} onChange={handleGithubChange} />

//         <label>Linkedin</label>
//         <input id="signupinput" type="text" value={linkedin} onChange={handleLinkedinChange} />

//         <label>Hackerrank</label>
//         <input id="signupinput" type="text" value={hackerrank} onChange={handleHackerrankChange} />

//         <label>Edyst</label>
//         <input id="signupinput" type="text" value={edyst} onChange={handleEdystChange} />

// <label>City</label>
//         <input id="signupinput" type="text" value={city} onChange={handleCityChange} />
