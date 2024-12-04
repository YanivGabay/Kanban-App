// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [t, i18n] = useTranslation('global');

  return (
    <AppBar position="static">
      <Toolbar sx={{ 
        justifyContent: 'center', // Centers toolbar items horizontally
        alignItems: 'center'     // Aligns toolbar items vertically
      }}>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', maxWidth: 800 }}>
          <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            {t('nav-bar.appTitle')}
          </Typography>
          <Box>
            {isAuthenticated ? (
              <>
                <Typography variant="body1" component="span" sx={{ marginRight: 2 }}>
                  {user}
                </Typography>
               
                <Button color="inherit" onClick={() => navigate('/')}>{t('nav-bar.home')}</Button>
                <Button color="inherit" onClick={() => navigate('/settings')}>{t('nav-bar.settings')}</Button>
                <Button color="inherit" onClick={() => navigate('/profile')}>{t('nav-bar.profile')}</Button>
                <Button color="inherit" onClick={logout}>{t('nav-bar.logout')}</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>{t('nav-bar.login')}</Button>
                <Button color="inherit" onClick={() => navigate('/register')}>{t('nav-bar.register')}</Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
