import React from "react";
import Slider from "react-slick";


import './mainpage.css'
import Bg4 from './image/bg7.jpg'
import img1 from './image/img1.jpeg'
import img2 from './image/img12.jpg'
import img3 from './image/img9.jpeg'
import img4 from './image/img6.JPG'
import img5 from './image/img5.JPG'
import img6 from './image/img8.jpeg'
import img7 from './image/img10.jpg'
import img8 from './image/img11.jpg'
import img9 from './image/img2.jpg'
import Bg6 from './image/bg6.jpg'
import Bg2 from './image/img14.jpg'
import satya from './image/Satyaanna.jpg'
import bhanu from './image/bhanuakka.png'
import group from './image/group1.png'
import sastra from './image/sastra.png'
import praveen from './image/praveen.png'


function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
    return (
      <div>
        <title>College Homepage</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
        {/* Navbar */}
        <nav className="mainpage-nav">
          <ul>
            <li><a href="/login">Student Login</a></li>
            <li><a href="#">Admin Login</a></li>
          </ul>
        </nav>
        {/* Header */}
        <header className="mainpage_header">
          <h1>Welcome to Special coding batch</h1>
          <p>Come and enlight your future</p>
          <button><a className='learn-more' href="#">Learn More</a></button>
        </header>
        {/* About College Section */}
        <section id="about-scb">
          <div className="container">
            <h2>About Us</h2>
            <p>Welcome to Coding Batch, where we are committed to transforming aspiring students into skilled coders, equipped to excel in the world of tech jobs. Our mission is to provide top-notch training and resources to help our students achieve their goals and unlock their full potential in the field of coding.</p>

            <p>We believe that with the right training, guidance, and support, anyone can become a successful coder. Our experienced instructors and mentors bring years of industry experience to the table, offering expert guidance and insights into the latest trends and technologies in the coding world.</p>

            <p>At Coding Batch, we take a hands-on approach to learning. Our curriculum is designed to provide practical, real-world experience, with plenty of opportunities to build projects and collaborate with fellow students. We understand that coding can be challenging, but we strive to make the learning process engaging, fun, and rewarding.</p>

            <p>We are proud to have helped countless students launch their coding careers and land top tech jobs. Our alumni have gone on to work at leading companies in the tech industry, from startups to Mnc companies.</p>

            <p>Whether you're a beginner looking to start your coding journey, or a seasoned pro seeking to sharpen your skills, Coding Batch has something for you. Join us today and discover what it takes to become a successful coder.</p>
          </div>
        </section>
        <section id="about-us">
          <div className="about-me">
            <div className="about-me-text">
              <h3>EDYST</h3>
              <p>Edyst connects students and creates a culture of learning. Our platform enables students form learning communities, compete in contests.Accelerate your career with Placement Preparation, Online Coding Bootcamps, Real-Time Projects and Job Referrals.888</p>
            </div>
            <img src={Bg6} alt="edyst" />
          </div>
          <div className="about-mee">
            <img src={Bg4} alt="me" />
            <div className="about-mee-text">
              <h3>IIIT-H</h3>
              <p>The purpose of this engagement with IIIT-H is to provide better opportunities to rural students, especially to rural girls, in emerging technologies to bridge the urban-rural gender disparities in computer science education</p>
            </div>
          </div>
        </section>
        {/* College Pics Section */}
        <section id="pics">
          <div className="gallery-container">
            <h2>Gallery</h2>
            <div className="image-grid-container">
              <div className="image-grid">
                <div>
                <figure><img src={img1} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img2} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img3} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img4} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img5} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img6} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img7} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img8} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={satya} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={group} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={sastra} alt="College Pic 1" /></figure>
                </div>
                <div>
                <figure><img src={img9} alt="College Pic 1" /></figure>
                </div>
              </div>
            </div>
            {/* <button className="prev-arrow">&lt;</button>
            <button className="next-arrow">&gt;</button> */}
          </div>
        </section>
        {/* Testimonials Section */}

        <section id="testimonials">
          <div className="testimonials_container">
            <h2>What Our Students Say</h2>
            <div className="testimonial-cards">
              <div className="testimonial-card">
                <img src={satya} alt="Student 1" />
                <p>Associate at INRY </p>
                <h4>Satya yalla(Alumni)</h4>
                <p className="title">Computer Science Student</p>
              </div>
              <div className="testimonial-card">
                <img src={bhanu} alt="Student 1" />
                <p>An Alumni of IIIT Hyderabad </p>
                <h4>Gunnam Durga Bhavani(Alumni)</h4>
                <p className="title">Computer Science Student</p>
              </div>
              <div className="testimonial-card">
                <img src={praveen} alt="Student 1" />
                <p>Student Coordinator</p>
                <h4>Praveen kumar</h4>
                <p className="title">Electronics Student</p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="main-foot">
          <div className="copy">© 2022 Developer</div>
          <div className="bottom-links">
            <div className="links">
              <span>More Info</span>
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div className="links">
              <span>Social Links</span>
              <a href="#"><i className="fab fa-facebook" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <p>Copyright © 2023</p>
        </footer></div>
    );

}

export default Home;