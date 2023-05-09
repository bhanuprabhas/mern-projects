import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    // You may want to also redirect the user to the login page or perform other actions here
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
