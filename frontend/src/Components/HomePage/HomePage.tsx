import React from 'react';
import "./HomePage.css";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bannerVideo from '../../Assets/homePage_clip.mp4'; 

export const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div className="mainHomePageDiv">
        <div>
          <video className="video-bg" autoPlay loop muted>
            <source src={bannerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-over-video">
          <div className="welcomeDiv">
            <Typography component="h1" className="welcomeText">Welcome to SunRay</Typography>
          </div>
          <Typography component="h2" className="homeText">
            Travel Reviews, Booking & More | Incredibly Low Prices
          </Typography>
          <Typography component="h2" className="homeText" sx={{gap: '5px'}}>
            go to our
            <Typography onClick={() => handleNavigate("/offers")} component="h2" className="loginPath">
              Offers Page
            </Typography>
          to view all our offers
          </Typography>
        </div>
      </div>
    </>
  );
};
