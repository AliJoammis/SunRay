import React from "react";
import { Typography } from "@mui/material";
import "./about.css";

export const About = () => {
  return (
    <div className="aboutUsMainContainer">
      <div className="aboutDiv">
        <div className="heroDiv">
          <div className="heroLeft heroScrollRight">SUN</div>
          <div className="heroMiddle">-</div>
          <div className="heroRight heroScrollLeft">RAY</div>
        </div>
        <div className="sidesDiv">
          <div className="sideCard leftSide">
            <Typography sx={{ color: 'black' }} variant="h6">Ali Joammis</Typography>
            <Typography variant="body2">Founder & Developer</Typography>
            <Typography variant="overline" sx={{display:"flex" , justifyContent:"right"}}>Full-Stack</Typography>
          </div>
          <div className="middle scrollDown">
            <Typography sx={{ color: 'black' }} variant="h4">About Us</Typography>
            <hr />
            <Typography variant="body1">
              <Typography sx={{ color: 'black' }} variant="h6">Welcome to Sunray</Typography>
              At Sunray, we believe that travel is not just about reaching a destination but about the experiences, 
              adventures, and memories created along the way. We are dedicated to making every journey unique and unforgettable.
              <hr/>
              <Typography sx={{ color: 'black' }} variant="h6">Our Story</Typography>
              Founded in [1999], Sunray was born out of a passion for exploring the world and sharing those experiences with others. 
              Our team of seasoned travelers and industry professionals came together with a mission to make travel planning easier, 
              more accessible, and enjoyable for everyone.
              <hr/>
              <Typography sx={{ color: 'black' }} variant="h6">Our Mission</Typography>
              Our mission is to inspire and enable people to explore the world, discover new cultures, and make lasting memories. We aim to provide exceptional travel experiences through our user-friendly platform, personalized services, and a vast array of travel options to suit every need and budget.</Typography>
              <hr />
          </div>
          <div className="sideCard rightSide">
            <Typography sx={{ color: 'black' }} variant="h6">Maha Abu Akel</Typography>
            <Typography variant="body2">Founder & Developer</Typography>
            <Typography variant="overline" sx={{display:"flex" , justifyContent:"right"}}>Full-Stack</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
