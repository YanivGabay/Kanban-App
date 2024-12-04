// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar sx={{ 
        justifyContent: 'center', // Centers toolbar items horizontally
        alignItems: 'center'     // Aligns toolbar items vertically
      }}>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', maxWidth: 800 }}>
          <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            My Kanban App
          </Typography>
          <Box>
            {isAuthenticated ? (
              <>
                <Typography variant="body1" component="span" sx={{ marginRight: 2 }}>
                  {user}
                </Typography>
                <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                <Button color="inherit" onClick={() => navigate('/settings')}>Settings</Button>
                <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
