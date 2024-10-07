import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

import LandscapeIcon from '@mui/icons-material/Landscape';
import { useUser } from '../../Context/Context';
import { Avatar } from '@mui/material';
// import Avatar from '@mui/material/Avatar';

const pages = [
  { label: 'About-Us', path: '/about' },
  { label: 'Contact-Us', path: '/contact' },
  { label: 'Offers', path: '/offers' },
];

export const MainNavbar = () => {
  const isMobile = useMediaQuery('(max-width:933px)');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // get user from context
  const { user, logout } = useUser();

  const handleLoginLogout = () => {
    if (user.role === "admin" || user.role === "user") {
      logout();
    } else {
      return;
    }
  };

  const stringToColor = (string: string) =>{
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const stringAvatar= (name: string) => {
    const upperCaseName = name.toUpperCase();
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${upperCaseName.split(' ')[0][0]}${upperCaseName.split(' ')[1][0]}`,
    };
  }

  return (
    <AppBar style={{ backgroundColor: "black" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LandscapeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, fontSize: 50, marginTop: -1.4 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={user.role === "guest" ? "./" : `./${user.role}`}
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SUNRAY
            </Typography>
          </Box>

          {isMobile && (
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                    <Typography component={Link} to={page.path} textAlign="center" sx={{
                      textDecoration: 'none',
                      color: 'black',
                      transform: 'translateX(-2%)',
                    }}>{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={user.role === "guest" ? "./" : `./${user.role}`}
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SunRay
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '50px' }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                sx={{
                  my: 2,
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: 'translateX(-28%)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: 0,
                    left: '50%',
                    backgroundColor: '#fff',
                    transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                  },
                  '&:hover::before': {
                    width: '100%',
                    left: '0%',
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          {user.role !== "guest" && (
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ mr: 4 }}
            >
              <Avatar {...stringAvatar(`${user.firstname} ${user.lastname}`)} />
            </Box>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Link to={user.role === "guest" ? "./auth/login" : "./"}>
              <Button onClick={() => handleLoginLogout()} 
              sx={{ fontSize: "1.1rem", textTransform: "none", width: "100px", border: '1px solid' }}>{user.role === "guest" ? "Log In" : "Logout"}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
