import React, { useState } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import './login.css'

function Login() {
  
  
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState("");
  const [rollnum, setRollnum] = useState("");
  const [city, setCity] = useState("");
  const [teamno, setTeamno] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [hackerrank, setHackerrank] = useState("");
  const [edyst, setEdyst] = useState("");
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  // const [mobilenumber, setmobilenumber] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  // const handleMobileNumberChange = (event) => {
  //   setmobilenumber(event.target.value);
  // };

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


  // const handleSignIn = () => {
  //   // handle sign in logic
    
  // };

  const handleLoginSubmit = (event) => {
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


  // const handleSignUp = () => {
  //   // handle sign up logic
  // };
  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmpassword) {
      // Display error message if password and confirm password do not match
      console.log("Passwords do not match");
      return;
    }

    // Perform signup request with username, email, and password values
    const data = {
      name,
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
        // navigate("/login");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        window.alert("User already Exists\n or \n Registration failed");
      });

    console.log(
      `Name: ${name}, Lastname:${lastname}, Email: ${email},Phone: ${phone},Rollnum: ${rollnum}, City:${city}, Teamno:${teamno}, Github: ${github}, Linkedin: ${linkedin}, Hackerrank: ${hackerrank}, Edyst: ${edyst}, Password: ${password}`
    );
  };



  const handleTabChange = (event) => {
    if (event.target.id === 'tab-1') {
      setShowSignInForm(true);
    } else if (event.target.id === 'tab-2') {
      setShowSignInForm(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked={showSignInForm} onChange={handleTabChange} />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!showSignInForm} onChange={handleTabChange} />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          {showSignInForm ? (
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="email" className="email">
                  Email
                </label>
                <input id="email" type="text" className="input" value={email} onChange={handleEmailChange} />
              </div>
              <div className="group">
                <label htmlFor="password" className="password">
                  Password
                </label>
                <input id="password" type="password" className="input" data-type="password" value={password} onChange={handlePasswordChange} />
              </div>
              {/* <div className="group">
                <input id="check" type="checkbox" className="check" defaultChecked />
                <label htmlFor="check">
                  <span className="icon" /> Keep me Signed in
                </label>
              </div> */}
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign In" onClick={handleLoginSubmit} />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="/fp">Forgot Password?</a>
              </div>
            </div>
          ) : (
            // signup form editing
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Name
                </label>
                <input id="user" type="text" className="input" value={name} onChange={handleNameChange} />
              </div>
            <div className="group">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" type="text" className="input" value={email} onChange={handleEmailChange} />
            </div>
            <div className="group">
                <label htmlFor="phone" className="label">Mobile Number</label>
                <input id="mobilenumber" type="text" className="input" value={phone} onChange={handlePhoneChange} />
            </div>
            <div className="group">
                <label htmlFor="rollnum" className="label">Roll Number</label>
                <input id="rollnum" type="text" className="input" value={rollnum} onChange={handleRollnumChange} />
            </div>
            <div className="group">
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" className="input" data-type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="group">
                <label htmlFor="confirmpassword" className="label">Confirm Password</label>
                <input id="confirmpassword" type="password" className="input" data-type="password" value={confirmpassword} onChange={handleConfirmPasswordChange} />
            </div>
            
            <div className="group">
                <input type="submit" className="button" defaultValue="Sign Up" onClick={handleSignupSubmit} />
            </div>
            <div className="hr" />
                <div className="foot-lnk">
                    <label htmlFor="tab-1">Already Member?</label>
                </div>
            </div>
            )}
        </div>
    </div>
</div>
);
}

export default Login;
