import React, { useState } from 'react';
import "./ForgetPassword.css"

function ForgetPassword() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberVerified, setIsMobileNumberVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleVerifyMobileNumberClick = () => {
    // Your logic for verifying the mobile number goes here.
    // For the sake of simplicity, we'll just assume that the
    // mobile number is always verified successfully.
    setIsMobileNumberVerified(true);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOtpClick = () => {
    // Your logic for verifying the OTP goes here.
    // For the sake of simplicity, we'll just assume that the
    // OTP is always verified successfully.
    setIsOtpVerified(true);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleResetPasswordClick = () => {
    // Your logic for resetting the password goes here.
    if (newPassword === confirmNewPassword) {
        // reset the password
        setIsPasswordReset(true);
      } else {
        // show an error message
        setErrorMessage("Passwords do not match. Please try again.");
      }
    // For the sake of simplicity, we'll just assume that the
    // password is always reset successfully.
  };

  return (
    <div className='forget-password-container'>
    <div className="forget-password-page">
      {!isMobileNumberVerified && (
        <div className="mobile-number-field">
            <h3>Forgot your password?</h3>
          <label htmlFor="mobile-number">Mobile Number:</label>
          <input
            type="tel"
            id="mobile-number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Enter mobile number"
          />
          <button onClick={handleVerifyMobileNumberClick}>Verify</button>
        </div>
      )}
      {isMobileNumberVerified && !isOtpVerified && (
        <div className="otp-field">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtpClick}>Submit</button>
        </div>
      )}
      {isOtpVerified && !isPasswordReset && (
        <div className="new-password-field">
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
          />
          <label htmlFor="confirm-new-password">Confirm New Password:</label>
          <input
            type="password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            placeholder="Re-enter new password"
          />
          <button onClick={handleResetPasswordClick}>Reset Password</button>
          {errorMessage && (<div className="error-message">{errorMessage}</div>)}
        </div>
      )}
      {isPasswordReset && (
        <div className="password-reset-successful">
          <p>Your password has been reset successfully!</p>
          </div>
      )}
    </div>
    </div>
  );
  }
  export default ForgetPassword;