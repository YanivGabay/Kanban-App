import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './components/Navbar';

import { Container, AppBar, Toolbar, CssBaseline, Box } from '@mui/material';
function App() {
  

  return (
    <Router>
      
         <Navbar />


      <Container component="main" maxWidth="lg" sx={{ mt: 2}} >
        <Box sx={{ my: 4 }}> {/* Margin top and bottom */}
          <Routes>
            {/* Home page - represents the dashboard */}
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            {/* Profile page */}
            <Route path="/profile" element={<Profile />} />
            {/* Login page */}
            <Route path="/login" element={<Login />} />
            {/* Register page */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Container>

    </Router>
  
  );
}

export default App
