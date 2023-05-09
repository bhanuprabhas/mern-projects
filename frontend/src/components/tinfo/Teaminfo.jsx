import React from 'react';
import teamData from './teamData.json';
import './Teaminfo.css';
import Navbar from "../navbar/navbar"
import Footer from '../footer/Footer';

function Teaminfo() {
  return (
    <div>
    <Navbar/>
    <div className='team-info-container'>
      <h2 style={{color:"white"}}>About My Team</h2>
    <div className="teaminfo">
      {teamData.map((member, index) => (
        <div className="teamcard" key={index}>
          {/* <img src={member.image} alt={member.name} /> */}
          <h2>{member.name}</h2>
          <p>{member.position}</p>
          <p>{member.bio}</p>
        </div>
      ))}
    </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Teaminfo;
