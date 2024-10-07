import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LandscapeIcon from '@mui/icons-material/Landscape';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import './footer.css';

const Footer = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box className={`footerContainer ${isVisible ? 'show' : 'hide'}`}>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={4} md={3}>
                    <Box display="flex" alignItems="center">
                        <LandscapeIcon sx={{ display: { xs: 'none', md: 'block' }, mr: 2, fontSize: 50 }} />
                        <Typography className='footerTitle' variant="h6" onClick={() => handleNavigate('/')} style={{ cursor: 'pointer' }}>
                            SUNRAY
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <Typography variant="subtitle1" textAlign="center">Explore</Typography>
                    <hr />
                    <Typography textAlign="center" variant="body2" onClick={() => handleNavigate('/')} style={{ cursor: 'pointer' }}>Home Page</Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <Typography variant="subtitle1" textAlign="center">Company</Typography>
                    <hr />
                    <Typography textAlign="center" variant="body2" onClick={() => handleNavigate('/about')} style={{ cursor: 'pointer' }}>About Us</Typography>
                    <Typography textAlign="center" variant="body2" onClick={() => handleNavigate('/contact')} style={{ cursor: 'pointer' }}>Contact Us</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                    <Typography variant="subtitle1">Follow Us</Typography>
                    <Box display="flex" justifyContent="center">
                        <IconButton color='inherit' onClick={() => window.open('https://facebook.com')}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color='inherit' onClick={() => window.open('https://twitter.com')}>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color='inherit' onClick={() => window.open('https://instagram.com')}>
                            <InstagramIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
