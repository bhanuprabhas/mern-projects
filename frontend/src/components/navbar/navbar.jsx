import React from 'react';
import './navbarstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from "./scb_logo.png"

function Navbar() {
  return (
    <div>
      <header className='navbar_header'>
        <nav>
          <ul>
            <li style={{ float: 'left' }}><img id="navbar-logo" src={logo} alt="logo" /></li>
            <li style={{ float: 'left' }}><h4><a href="/home">Dashboard</a></h4></li>
            <li><a href="#"><FontAwesomeIcon icon={faBell} /></a></li>
            <li><a href="#"><FontAwesomeIcon icon={faUser} /></a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;