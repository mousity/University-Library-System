import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>We are five dedicated college students who started this online library system as a project for our 430 Software Engineering class. Over the past four months, our project has evolved into a fully functioning, full-time system that we are proud to maintain.</p>
      
      <h2>Our Team</h2>
      <div className="team-member">
        <h3>Samr Mouna</h3>
        <p>Role: Tech Lead / Developer</p>
        <p>Samr oversees the technical direction and architecture of the project. As the Tech Lead, he ensures that the development team follows best practices and that the system is scalable, secure, and efficient. He also contributes to the coding and development of critical system components.</p>
      </div>
      <div className="team-member">
        <h3>Joshi Joseph</h3>
        <p>Role: QA / Developer</p>
        <p>Joshi is responsible for quality assurance, making sure that the system is bug-free and performs optimally. He designs and executes test plans, identifies issues, and works closely with the development team to resolve them. Additionally, he contributes to the development of new features.</p>
      </div>
      <div className="team-member">
        <h3>Christopher Nieves</h3>
        <p>Role: Manager / Developer</p>
        <p>Christopher manages the project, coordinating between team members and ensuring that the project stays on schedule. He handles project planning, resource allocation, and communication with stakeholders. He also participates in the development process, contributing code and technical solutions.</p>
      </div>
      <div className="team-member">
        <h3>Kevyn Muniz</h3>
        <p>Role: Project Analyst / Developer</p>
        <p>Kevyn analyzes project requirements and translates them into technical specifications. He conducts research, gathers data, and helps define the project's scope. His analytical skills ensure that the system meets user needs and project goals. Kevyn also contributes to the development and implementation of features.</p>
      </div>
      <div className="team-member">
        <h3>Daniel Fahmy</h3>
        <p>Role: Developer</p>
        <p>Daniel focuses on writing code and developing features for the system. He works on various aspects of the project, from front-end design to back-end integration. His contributions ensure that the system is functional, user-friendly, and meets the project's technical standards.</p>
      </div>
      
      <h2>Our Journey</h2>
      <p>Our journey began with a shared vision of creating an innovative library system that could serve the needs of students and the community. Through countless hours of coding, collaboration, and problem-solving, we have built a system that we are truly proud of.</p>
      
      <h2>Our Vision</h2>
      <p>We aim to continue improving and expanding this library system, making it more robust and user-friendly. We believe in the power of technology to transform education and knowledge sharing, and we are committed to making this system an essential resource for everyone.</p>
      
      <p>Thank you for using our online library system. We hope it serves you well!</p>
    </div>
  );
}

export default AboutUs;