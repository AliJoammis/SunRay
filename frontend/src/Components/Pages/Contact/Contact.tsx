import React from 'react';
import './contact.css';

export const Contact = () => {
  const phoneNumbers = [
    {name: 'General Enquiries', number: '052-5015828'},
    { name: 'Booking', number: '077-470-1125'},
    { name: 'Support', number: '054-7088619'}
  ];

  const teamMembers = [
    { name: 'Ali Joammis', github: 'AliJoammis'},
    { name: 'Maha Abu Akel', github: '#'}
  ];

  return (
    <div className="mainContactDiv">

    
    <div className="contact-section">
      <h2>Contact Our Team</h2>
      <p className='contactus-text'>We'd love to hear from you! Whether you have a question, need assistance, or just want to share your travel experiences, feel free to reach out to us.</p>
      <ul className="contact-list">
        {phoneNumbers.map((contact, index) => (
          <li key={index} className="contact-item">
            <span className="contact-name">{contact.name}:</span>
            <a href={`tel:${contact.number}`} className="contact-number">{contact.number}</a>
          </li>
        ))}
      </ul>
      <div className='email-address'>              
        Email: support@SunRay.com |
        Address: HaHistadrut Ave 46, Haifa
      </div>
      
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <h3 className="team-name">{member.name}</h3>
            <a href={`https://github.com/${member.github}`} className="github-link" target="_blank" rel="noopener noreferrer">
              <img src={`https://github.com/${member.github}.png`} alt="GitHub Profile" className="github-logo" />
              GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
