import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/navbar';
import "./homepage.css";

function Card(props) {
  return (
    <a href={props.link}>
      <div className="card">
        <div className={`front ${props.class}`}></div>
        <div className="back">
          {props.title}
        </div>
      </div>
    </a>
  );
}

function Homepage() {
  return (
    <>
    <div>
      <div className="App">
        <Navbar/>
        
      <div className="homepage_container">
        <Card class="front" title="Student Info" link="/profile" />
        <Card class="front1" title="Performance" link="#" />
        <Card class="front4" title="Schedule" link="/calender" />
        <Card class="front5" title="Code Compiler" link="/que" />
        <Card class="front9" title="Todo" link="/todo" />
        <Card class="front6" title="Projects" link="#" />
        <Card class="front2" title="Attendance" link="#" />
        <Card class="front3" title="Team Info" link="/teaminfo" />
        <Card class="front7" title="Announcements" link="#" />
        <Card class="front8" title="Settings" link="#" />
        <Card class="front10" title="Courses" link="/course" />
        <Card class="front11" title="Id card" link="#" />
      </div>
      </div>
    </div>
    </>
  );
}

export default Homepage;